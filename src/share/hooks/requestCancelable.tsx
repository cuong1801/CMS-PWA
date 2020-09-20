import { Action, Dispatch } from 'redux'
import { BaseActionParams, cancelRequest } from '../../store/actions/base.action'
import { Unknown } from '../interface/Unknown'

interface CancelRequestOptions {
    dispatch: Dispatch
    actionHandler: (options?: BaseActionParams) => Action
    clearDetailHandler?: () => Action
    isFetch?: boolean
    buttonRef?: React.RefObject<HTMLButtonElement>
    body?: Unknown
}
export default function (props: CancelRequestOptions): React.EffectCallback {
    const { isFetch, dispatch, actionHandler, clearDetailHandler } = props
    return () => {
        if (isFetch) {
            dispatch(actionHandler())
        }
        return () => {
            dispatch(cancelRequest())
            clearDetailHandler && dispatch(clearDetailHandler())
        }
    }
}

export function requestCancelableOnClick({ body, buttonRef, dispatch, actionHandler }: CancelRequestOptions): void {
    if (buttonRef) {
        buttonRef.current?.setAttribute('disabled', 'true')
    }
    dispatch(actionHandler({ elemRef: buttonRef, body }))
}
