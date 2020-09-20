import React, { forwardRef, useRef, useState } from 'react'
import { Unknown } from '../../interface/Unknown'
import './style/index.scss'

export interface Source extends Unknown {
    id: string
    name: string
}
type SelectProps = {
    dataSource: Source[]
    placeholder?: string
    className?: string
    onChange?: (value: string) => void
}

export const SSelect = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const { dataSource, placeholder, className, onChange } = props
    const dataRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [valueFilter, setValueFilter] = useState('')

    const onFocusHandler = () => {
        if (dataRef.current) dataRef.current.style.display = 'block'
    }

    const onFocusOutHandler = () => {
        if (dataRef.current) dataRef.current.style.display = 'none'
    }

    const onItemSelected = (event: React.MouseEvent<HTMLDivElement>) => {
        const id = event.currentTarget.id
        const selected = dataSource.find((item) => item.id === id)
        if (inputRef.current && selected) {
            inputRef.current.value = selected.name
            onChange && onChange(selected.id)
        }
        setValueFilter('')
    }

    const filters = valueFilter
        ? dataSource.filter((item) => item.name.toLowerCase().includes(valueFilter))
        : dataSource
    return (
        <div className={`${className} data-over`}>
            <input
                ref={inputRef}
                className='data-input'
                placeholder={placeholder}
                onChange={(event) => setValueFilter(event.currentTarget.value.toLowerCase())}
                onFocus={onFocusHandler}
                onBlur={onFocusOutHandler}
            />
            <i className='fa fa-caret-down'></i>
            <div ref={dataRef} style={{ display: 'none' }} className='data-list scroll-container'>
                {filters.map((source) => (
                    <div key={source.id} id={source.id} className='option' onMouseDown={onItemSelected}>
                        {source.name}
                    </div>
                ))}
            </div>
        </div>
    )
})
