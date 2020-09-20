import React, { useEffect, useRef } from 'react'
import { InputNumber } from '../../vendors/input'
import './style/index.scss'

const Disabled = 'disabled'
const DefaultValue = ''

interface QuantityInputProps {
    quantity: number
    productId?: string
    maxLength: number
    onQuantityChangeHandler?: (latest: number) => void
}

export function QuantityInput(props: QuantityInputProps): JSX.Element {
    const { quantity, maxLength, onQuantityChangeHandler } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const decrementRef = useRef<HTMLInputElement>(null)
    const incrementRef = useRef<HTMLInputElement>(null)

    const onDecrementClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (inputRef.current && decrementRef.current && incrementRef.current) {
            const val = parseInt(inputRef.current.value) - 1
            incrementRef.current?.removeAttribute(Disabled)
            inputRef.current.value = val.toString()
            onQuantityChangeHandler && onQuantityChangeHandler(val)
            if (val === 1) decrementRef.current.setAttribute(Disabled, DefaultValue)
        }
    }

    const onIncrementClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (inputRef.current && incrementRef.current && decrementRef.current) {
            const val = parseInt(inputRef.current.value) + 1
            decrementRef.current.removeAttribute(Disabled)
            inputRef.current.value = val.toString()
            onQuantityChangeHandler && onQuantityChangeHandler(val)
            if (`${val + 1}`.length > maxLength) incrementRef.current.setAttribute(Disabled, DefaultValue)
        }
    }

    const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (inputRef.current && incrementRef.current && decrementRef.current) {
            const value = parseInt(inputRef.current.value)
            if (value === 1) {
                decrementRef.current.setAttribute(Disabled, DefaultValue)
                incrementRef.current.removeAttribute(Disabled)
            } else if (`${value + 1}`.length > maxLength) {
                incrementRef.current.setAttribute(Disabled, DefaultValue)
                decrementRef.current.removeAttribute(Disabled)
            } else {
                incrementRef.current.removeAttribute(Disabled)
                decrementRef.current.removeAttribute(Disabled)
            }
            onQuantityChangeHandler && onQuantityChangeHandler(value)
        }
    }

    useEffect(() => {
        // handle disabled in useEffect to prevent stuck buttons
        if (decrementRef.current && incrementRef.current) {
            if (quantity === 1) {
                decrementRef.current.setAttribute(Disabled, DefaultValue)
                incrementRef.current.removeAttribute(Disabled)
            } else if (`${quantity + 1}`.length > maxLength) {
                incrementRef.current.setAttribute(Disabled, DefaultValue)
                decrementRef.current.removeAttribute(Disabled)
            }
        }
        if (inputRef.current) {
            inputRef.current.value = quantity.toString()
        }
    }, [quantity])

    return (
        <span className='order-number clearfix'>
            <input
                ref={decrementRef}
                className='btn_decrement'
                type='button'
                defaultValue='-'
                onClick={onDecrementClick}
            />
            <InputNumber
                ref={inputRef}
                className='form_control addtocart_quantity'
                onBlur={onBlurHandler}
                min={1}
                maxLength={maxLength}
            />
            <input
                className='btn_increment'
                ref={incrementRef}
                type='button'
                defaultValue='+'
                onClick={onIncrementClick}
            />
        </span>
    )
}
