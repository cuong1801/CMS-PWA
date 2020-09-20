import { isStringEmpty, isNumberEmpty } from './empty-util'

const textRegex = /^\W+/
const replacement = 'z'

export function sortByText(textA: string, textB: string): number {
    if (isStringEmpty(textA) || isStringEmpty(textB)) return -1
    return textA.replace(textRegex, replacement).localeCompare(textB.replace(textRegex, replacement))
}

export function sortByNumber(numberA: number, numberB: number): number {
    if (isNumberEmpty(numberA) || isNumberEmpty(numberB)) return -1
    return numberA - numberB
}
