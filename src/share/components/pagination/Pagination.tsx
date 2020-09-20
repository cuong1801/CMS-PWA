import Pages from 'rc-pagination'
import React, { Fragment } from 'react'
import { isNullOrUndefined } from '../../utils/empty-util'
import './style/index.scss'
interface PaginationProps {
    defaultSize: number
    onPageChange: (value: number) => void
    totalRecords?: number
}
export default function Pagination({ onPageChange, totalRecords, defaultSize }: PaginationProps): JSX.Element {
    const pageParams = new URLSearchParams(window.location.search)

    if (isNullOrUndefined(totalRecords)) return <Fragment />
    return (
        <div id='pagination-custom' className='pagination-nav text-center mt_20'>
            <Pages
                defaultCurrent={Number(pageParams.get('page'))}
                total={totalRecords}
                defaultPageSize={defaultSize}
                hideOnSinglePage
                showPrevNextJumpers
                onChange={(value) => onPageChange(value)}
                prevIcon={<button className='fa fa-angle-left ' />}
                nextIcon={<button className='fa fa-angle-right' />}
                jumpPrevIcon={<button>...</button>}
                jumpNextIcon={<button>...</button>}
            />
        </div>
    )
}
