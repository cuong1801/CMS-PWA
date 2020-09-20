import React, { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MenuPaths } from '../../common/app-constants'
import { Product } from '../../interface'
import CurrencyView from '../currency/CurrencyView'
import { ImageView } from '../image'
import { QuantityInput } from '../quantity-input'
import './style/product-item.scss'
interface ProductProps {
    product: Product
}
export default function Product({ product }: ProductProps): JSX.Element {
    const quantityRef = useRef(1)

    function onQuantityChangeHandler(latest: number) {
        quantityRef.current = latest
    }

    function onClickBuy() {
        window.alert(
            `Đi tới giỏ hàng? bạn đã chọn mua: ${product.name} với số lượng là ${quantityRef.current} Tổng tiền là ....`
        )
    }

    return (
        <Fragment>
            <div id='product-item' className='product-schance'>
                <div className='img-product'>
                    <ImageView src={product.imageUrl} />
                </div>
                <Link to={`${MenuPaths.product}/chi-tiet-san-pham`} className='title-product'>
                    {product.name}
                </Link>
                <div className='price-product'>
                    {product.promoteRate === 0 || product.promoteRate === undefined ? (
                        <CurrencyView value={product.price} />
                    ) : (
                        <Fragment>
                            <span className='percent-product'>{product.promoteRate}%</span>
                            <CurrencyView value={product.price - (product.price * product.promoteRate) / 100} />
                            <span className='product-price-initial'>
                                <CurrencyView value={product.price} />
                            </span>
                        </Fragment>
                    )}
                </div>
                <div className='percent-donate'>
                    <span className='title-donate'>Tỉ lệ ủng hộ:</span>
                    <span className='number-donate'>{product.donateRate}%</span>
                </div>
                <div className='number-cart'>
                    <span className='order-number clearfix'>
                        <QuantityInput
                            quantity={quantityRef.current}
                            maxLength={2}
                            onQuantityChangeHandler={onQuantityChangeHandler}></QuantityInput>
                    </span>
                    <button onClick={onClickBuy} className='select-cart buy-product-item'>
                        Chọn mua
                    </button>
                </div>
                <Link to={`/${MenuPaths.company}/chi-tiet`} className='company-product'>
                    {product.company}
                </Link>
            </div>
        </Fragment>
    )
}
