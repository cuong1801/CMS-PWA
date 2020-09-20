import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MenuPaths } from '../../../share/common/app-constants'
import Pagination from '../../../share/components/pagination/Pagination'
import { requestCancelableOnClick } from '../../../share/hooks/requestCancelable'
import { updateURLSearch } from '../../../share/utils/app-util'
import { pageChangeAction } from '../../../store/actions/product.action'
import { AppState } from '../../../store/types'

type Props = { defaultSize: number }
export default function PaginationProduct({ defaultSize }: Props): JSX.Element {
    const history = useHistory()
    const dispatch = useDispatch()
    const totalRecords = useSelector<AppState, number | undefined>((state) => state.products.totalRecords)

    const onPageChange = useCallback((page: number) => {
        requestCancelableOnClick({
            body: { page: page },
            dispatch,
            actionHandler: pageChangeAction
        })
        updateURLSearch(history, MenuPaths.product, `page=${page}`)
    }, [])

    return (
        <div id='pagination-custom' className='pagination-nav text-center mt_20'>
            <Pagination defaultSize={defaultSize} totalRecords={totalRecords} onPageChange={onPageChange} />
        </div>
    )
}
