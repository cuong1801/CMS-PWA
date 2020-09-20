import React, { useEffect, useRef } from 'react'
import { fromEvent, interval as delay } from 'rxjs'
import { debounce } from 'rxjs/operators'
import CarouselAPI from '../../../libs/carousel-native'
import './style/index.scss'

type ResponsiveOptions = { lg?: number; md?: number; sm?: number; xs?: number }
interface CarouselProps {
    listItem: JSX.Element[]
    id?: string
    multiInner?: boolean
    interval?: number
    responsiveOptions?: ResponsiveOptions
}

export default function Carousel(props: CarouselProps): JSX.Element {
    const { id, interval, multiInner, listItem } = props
    const carouselRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        new CarouselAPI(`#${id}`, { cycle: true, pause: false, keyboard: false })
        function mutiItemPerSlide(init?: boolean) {
            if (multiInner && carouselRef.current) {
                carouselRef.current['init'] = init
                handleMultiItemPerSlide(carouselRef.current, props.responsiveOptions)
            }
        }
        const subscription = fromEvent(window, 'resize')
            .pipe(debounce(() => delay(100)))
            .subscribe(() => mutiItemPerSlide())
        mutiItemPerSlide(true)
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return (
        <div
            id={id}
            ref={carouselRef}
            className={`carousel slide ${multiInner ? 'multi-item' : ''}`}
            data-ride='carousel'
            data-interval={interval || 3000}
            data-touch='true'
            data-pause='hover'>
            {/* Indicators */}
            {!multiInner && (
                <ol className='carousel-indicators'>
                    {listItem.map((_, index) => (
                        <li
                            key={index}
                            data-target={`#${id}`}
                            data-slide-to={index}
                            className={`${index === 0 && 'active'}`}
                        />
                    ))}
                </ol>
            )}
            {/* Wrapper for slides */}
            <div className='carousel-inner'>{listItem.map((item, index: number) => CarouselItem(item, index))}</div>
            {/* Controls */}
            <a className='carousel-control-prev' href={`#${id}`} role='button' data-slide='prev'>
                <span className='carousel-control-prev-icon' aria-hidden='true' />
                <span className='sr-only'>Prev</span>
            </a>
            <a className='carousel-control-next' href={`#${id}`} role='button' data-slide='next'>
                <span className='carousel-control-next-icon' aria-hidden='true' />
                <span className='sr-only'>Next</span>
            </a>
        </div>
    )
}

function CarouselItem(item: JSX.Element, index: number): JSX.Element {
    return (
        <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
            <div className='slide-item'>{item}</div>
        </div>
    )
}

function handleMultiItemPerSlide(element: HTMLDivElement, responsiveOptions: ResponsiveOptions = {}) {
    const items = Array.from(element.childNodes[0].childNodes)
    const itemPerSlide = extractItemPerSlide(responsiveOptions)
    const slideLength = items.length
    for (let index = 0; index < slideLength; index++) {
        const value = items[index] as HTMLDivElement
        if (itemPerSlide < value.childNodes.length) {
            const removeNodes = value.childNodes.length - itemPerSlide
            for (let j = 0; j < removeNodes; j++) {
                value.lastChild && value.removeChild(value.lastChild)
            }
        } else {
            const nextIndex = index + 1
            let nextItems = items.slice(nextIndex, itemPerSlide)
            const needMoreItems = itemPerSlide - nextItems.length
            if (needMoreItems > 0) nextItems = nextItems.concat(items.slice(0, needMoreItems))
            if (element['init']) {
                nextItems.forEach((item) => {
                    value.appendChild(item.childNodes[0].cloneNode(true))
                })
            } else {
                const addNodes = itemPerSlide - value.childNodes.length
                for (let k = 0; k < addNodes; k++) {
                    const childNode = nextItems[value.childNodes.length - k].childNodes[0].cloneNode(true)
                    value.appendChild(childNode)
                }
            }
        }
    }
}

function extractItemPerSlide(responsiveOptions: ResponsiveOptions) {
    const { lg = 0, md = 0, sm = 0, xs = 0 } = responsiveOptions
    const { innerWidth } = window
    if (innerWidth > 1024) return lg
    if (innerWidth > 750) return md
    if (innerWidth > 425) return sm
    return xs
}
