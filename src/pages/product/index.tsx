import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductList from '../../share/components/product/ProductList'
import requestCancelable from '../../share/hooks/requestCancelable'
import { Product } from '../../share/interface'
import { isNullOrUndefined } from '../../share/utils/empty-util'
import { clearProductList, fetchProductResources } from '../../store/actions/product.action'
import { AppState } from '../../store/types'
import PaginationProduct from './fragments/PaginationProduct'
import SearchOption from './fragments/SearchOption'
import './styles/index.scss'

export default function Products(): JSX.Element {
    const productList = useSelector<AppState, Product[] | undefined>((state) => state.products.products)
    const isLoading = isNullOrUndefined(productList)
    const dispatch = useDispatch()

    useEffect(
        requestCancelable({
            isFetch: isLoading,
            dispatch: dispatch,
            actionHandler: fetchProductResources,
            clearDetailHandler: clearProductList
        }),
        []
    )

    return (
        <Fragment>
            <SearchOption />
            <ProductList productList={productList} />
            <PaginationProduct defaultSize={20} />
        </Fragment>
    )
}
