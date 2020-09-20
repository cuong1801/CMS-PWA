import { Any } from '../interface/Unknown'

export function mergeArray(oldArr: Any[], newArr: Any[]): void {
    const oldLength = oldArr.length
    const newLength = newArr.length

    // pre allocate size
    oldArr.length = oldLength + newLength
    for (let index = 0; index < newLength; index++) {
        // add item
        oldArr[oldLength + index] = newArr[index]
    }
}
