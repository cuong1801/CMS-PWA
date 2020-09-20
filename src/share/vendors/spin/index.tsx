import React from 'react'
import './style/index.css'

export default function SSpin(): JSX.Element {
    return (
        <div className='lds-roller'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
