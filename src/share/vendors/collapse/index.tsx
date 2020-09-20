import React, { ReactNode, useEffect } from 'react'
import CollapseAPI from '../../../libs/collapse-native'
import './style/index.scss'

interface CollapseProps {
    id: string
    title: string
    role?: string
    children?: ReactNode
}

export default function Collapse({ id, title, role, children }: CollapseProps): JSX.Element {
    useEffect(() => {
        new CollapseAPI(`#${id}`)
    }, [])

    return (
        <div className='panel-group'>
            <div
                className='panel-default'
                id={id}
                role={role}
                aria-expanded='false'
                aria-controls={`${id}-content`}
                data-toggle='collapse'
                data-target={`#${id}-content`}>
                {title}
            </div>
            <div className='collapse' id={`${id}-content`}>
                {children}
            </div>
        </div>
    )
}
