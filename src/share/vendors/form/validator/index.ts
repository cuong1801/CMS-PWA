import { FormState, Rule } from '..'
import { Unknown } from '../../../interface/Unknown'

export function validateRequired(key: string, value: string, errors: Unknown, message?: string): boolean {
    if (value.length > 0) {
        delete errors[key]
        return false
    } else {
        errors[key] = message
        return true
    }
}

export function validatePattern(key: string, value: string, errors: Unknown, rule: Rule): boolean {
    if (rule.pattern) {
        if (rule.pattern.test(value)) {
            delete errors[key]
            return false
        } else {
            errors[key] = rule.message
            return true
        }
    }
    return false
}

export function validateFormValid(formState: FormState): boolean {
    for (const key in formState) {
        const element = formState[key]
        if (!element.isValid) return false
    }
    return true
}
