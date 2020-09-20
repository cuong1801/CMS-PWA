import { Any, Unknown } from '../interface/Unknown'

export function isNullOrUndefined(value?: Any): boolean {
    return value === undefined || value === null
}

export function isObjectEmpty(obj: Unknown = {}): boolean {
    return isNullOrUndefined(obj) || Object.keys(obj).length === 0
}

export function isArrayEmpty(arr?: Array<Unknown>): boolean {
    return isNullOrUndefined(arr) || !Array.isArray(arr) || arr.length === 0
}

export function isStringEmpty(str: string): boolean {
    return isNullOrUndefined(str) || str.trim().length === 0
}

export function isNumberEmpty(value: number): boolean {
    return isNullOrUndefined(value) || Number.isNaN(value)
}
