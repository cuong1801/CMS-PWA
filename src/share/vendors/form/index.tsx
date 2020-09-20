import React, { createContext, ReactNode, useContext, useEffect, useReducer, useRef } from 'react'
import { fromEvent, merge, Subscription } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import { Any, Unknown } from '../../interface/Unknown'
import { isObjectEmpty } from '../../utils/empty-util'
import './style/index.scss'
import { validateFormValid, validatePattern, validateRequired } from './validator'

export type FormState = { [name in string]: FieldState }
export type Rule = { required?: boolean; pattern?: RegExp; message?: string }
type FieldState = { isTouched?: boolean; isValid?: boolean; isValidated?: boolean; rules?: Array<Rule> }
type SFormProps = { children: ReactNode; className?: string }
type FormAction = { type: string; payload: Any }
type FormItemValue = { name: string; dispatch: React.Dispatch<FormAction>; rules?: Array<Unknown>; errors?: Unknown }
type FormMeta = { name: string; rules?: Array<Rule>; className?: string }
type FormSubmit = { onFinish: (values: Unknown) => void }
type FormStore = { store?: Unknown; state?: FormState; errors?: Unknown }

const FormContext = createContext<FormStore>({ store: {}, state: {} })
const FormItemContext = createContext<FormItemValue>({ name: '', dispatch: () => null })

const formReducer = (state: FormStore, action: FormAction) => {
    switch (action.type) {
        case 'validate':
            return validateItem(state, action.payload)
        default:
            return valueChange(state, action.type, action.payload)
    }
}

function valueChange(state: FormStore, key: string, payload: { value: string; rules: Array<Rule> }) {
    const { value, rules } = payload
    const errors = {}
    if (rules) {
        for (let index = 0; index < rules.length; index++) {
            const rule = rules[index]
            if (validateRequired(key, value, errors, rule.message)) break
            if (validatePattern(key, value, errors, rule)) break
        }
        state[key] = value
        return { ...state, errors }
    } else {
        state[key] = value
    }
    return { ...state }
}

function validateItem(state: Unknown, payload: Unknown) {
    const errors = {}
    Object.keys(payload).map((key) => {
        const field = payload[key] as FieldState
        if (field.rules) {
            errors[key] = field.rules[0].message
        }
    })
    return { ...state, errors }
}

export default function SForm({ children, className, onFinish }: SFormProps & FormSubmit): JSX.Element {
    const formStoreRef = useRef<Unknown>({})
    const formStateRef = useRef<FormState>({})
    const [state, dispatch] = useReducer(formReducer, {})

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        if (!isObjectEmpty(formStoreRef.current) && !validateFormValid(formStateRef.current)) return false
        if (isObjectEmpty(formStoreRef.current)) {
            // trigger validate
            dispatch({ type: 'validate', payload: formStateRef.current })
        } else {
            onFinish(formStoreRef.current)
        }
        return false
    }

    return (
        <FormContext.Provider
            value={{ store: formStoreRef.current, state: formStateRef.current, errors: state.errors }}>
            <form className={className} onSubmit={onSubmitHandler}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export function SFormItem({ children, name, className, rules }: SFormProps & FormMeta): JSX.Element {
    const { store = {}, state = {} } = useContext(FormContext)
    const [formState, dispatch] = useReducer(formReducer, {})

    useEffect(() => {
        if (formState.errors && !formState.errors[name] && formState[name]) {
            state[name].isValid = state[name].isTouched = state[name].isValidated = true
            store[name] = formState[name]
        } else if (state[name]) {
            state[name].isValid = false
            store[name] = formState[name]
        }
    }, [formState[name]])

    useEffect(() => {
        if (rules) state[name] = { isTouched: false, isValid: false, isValidated: false, rules }
    }, [])

    return (
        <FormItemContext.Provider value={{ name, rules, errors: formState.errors, dispatch }}>
            <div className={className}>{children}</div>
        </FormItemContext.Provider>
    )
}

export function SInputItem(props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    const { errors: formError } = useContext(FormContext)
    const { name, rules, errors: fieldError, dispatch } = useContext(FormItemContext)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const eventSubcrible: Subscription = merge(
            ['change', 'blur'].map((evt) => {
                return (
                    inputRef.current &&
                    fromEvent(inputRef.current, evt)
                        .pipe(
                            map((event) => (event.currentTarget as HTMLInputElement).value),
                            debounceTime(200)
                        )
                        .subscribe((value) => dispatch({ type: name, payload: { value, rules } }))
                )
            })
        ).subscribe()
        return () => {
            eventSubcrible && eventSubcrible.unsubscribe()
        }
    }, [])

    const errors = fieldError || formError
    return (
        <div className='input-validate'>
            <input ref={inputRef} name={name} {...props} />
            {errors && errors[name] && <span className='error'>{errors[name]}</span>}
        </div>
    )
}
