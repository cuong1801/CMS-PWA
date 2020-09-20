import React from 'react'
import { Product } from '../../../share/interface'
import ProductItem from './ProductItem'
import './style/product-list.scss'
interface ProductListProps {
    productList?: Product[]
}
export default function ProductList({ productList }: ProductListProps): JSX.Element {
    return (
        <div className='product-grid clearfix'>
            {productList?.map((product) => {
                return (
                    <div key={`productlist-${product.id}`} className='item col-lg-3 col-md-4 col-sm-6 col-xs-12'>
                        <ProductItem product={product} />
                    </div>
                )
            })}
        </div>
    )
}
