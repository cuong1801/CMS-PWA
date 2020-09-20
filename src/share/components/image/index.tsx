import React from 'react'
import noImage from '../../../assets/images/image-not-found.jpg'
import './style/index.scss'

interface LazyLoadProps {
    src: string
}

export function ImageView(props: LazyLoadProps): JSX.Element {
    return <img src={props.src} onError={(event) => (event.target['src'] = noImage)} loading='lazy' />
}
