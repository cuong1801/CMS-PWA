import React, { forwardRef, InputHTMLAttributes } from 'react'
import './style/index.css'

const NumberRegex = /[0-9]|\./
type InputNumberProps = InputHTMLAttributes<HTMLInputElement>

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, inputRef) => {
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = String.fromCharCode(event.keyCode || event.which)
        if (!NumberRegex.test(key)) {
            event.preventDefault()
        }
    }

    const onPasteHandler = (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (!NumberRegex.test(event.clipboardData.getData('text/plain'))) {
            event.preventDefault()
        }
    }

    return (
        <input
            type='text'
            ref={inputRef}
            className={props.className}
            onKeyPress={onKeyPressHandler}
            onPaste={onPasteHandler}
            {...props}
        />
    )
})
