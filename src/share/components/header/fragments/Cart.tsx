import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeQuantityItem, removeCartItem } from '../../../../store/actions/cart.action'
import { AppState } from '../../../../store/types'
import { MenuPaths } from '../../../common/app-constants'
import { Product } from '../../../interface'
import { Unknown } from '../../../interface/Unknown'
import CurrencyView from '../../currency/CurrencyView'
import { QuantityInput } from '../../quantity-input'
import '../style/cart.scss'

export default function Cart(): JSX.Element {
    const products = useSelector<AppState, Product[]>((state) => state.cart.products)
    const totalAmount = useSelector<AppState, number>((state) => state.cart.totalAmount)
    const cartRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()

    const removeProduct = (index: number) => {
        dispatch(removeCartItem(index))
    }

    const onCartToggle = () => {
        if (cartRef.current) {
            if (cartRef.current.clientHeight) {
                toggleCartOff(cartRef.current)
            } else {
                toggleCartOn(cartRef.current)
            }
        }
    }

    useEffect(() => {
        function handleClickOutside(event: Unknown) {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                toggleCartOff(cartRef.current)
            }
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return (
        <div className='shopping-icon'>
            <span onClick={onCartToggle}>
                <i className='ion-bag' />
            </span>
            <div onClick={onCartToggle} className='cart-item'>
                <span>{'Sản phẩm : '}</span>
                <span className='cart-qty'>{products.length}</span>
            </div>
            <div ref={cartRef} id='cart-dropdown' className='cart-menu'>
                {products.length > 0 ? (
                    <CartContent
                        products={products}
                        totalAmount={totalAmount}
                        removeProduct={removeProduct}
                        toggleCartOff={() => (cartRef.current ? toggleCartOff(cartRef.current) : undefined)}
                    />
                ) : (
                    <CartEmpty toggleCartOff={() => (cartRef.current ? toggleCartOff(cartRef.current) : undefined)} />
                )}
            </div>
        </div>
    )
}

function CartEmpty({ toggleCartOff }: { toggleCartOff: () => void }): JSX.Element {
    return (
        <ul className='cart-empty'>
            <li>
                <i className='ion-android-playstore' />
            </li>
            <li>Giỏ hàng trống</li>
            <li>
                <input className='btn pull-right mt_10' defaultValue='Quay lại' type='button' onClick={toggleCartOff} />
            </li>
        </ul>
    )
}

interface CartItemProps {
    products: Product[]
    totalAmount: number
    removeProduct: (index: number) => void
    toggleCartOff: () => void
}
function CartContent({ products, totalAmount, removeProduct, toggleCartOff }: CartItemProps): JSX.Element {
    const dispatch = useDispatch()

    const onQuantityChange = (quantity: number, index: number) => {
        dispatch(changeQuantityItem(index, quantity))
    }

    const onCheckoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        toggleCartOff()
        if (location.pathname === MenuPaths.checkout) event.preventDefault()
    }

    return (
        <ul>
            <li>
                <table className='table table-striped'>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td className='text-center'>
                                    <Link to={`${MenuPaths.product}/${product.id}`} onClick={toggleCartOff}>
                                        <img src={product.imageUrl} alt={product.name} title={product.name} />
                                    </Link>
                                </td>
                                <td className='text-left product-name'>
                                    <Link to={`${MenuPaths.product}/${product.id}`} onClick={toggleCartOff}>
                                        {product.name}
                                    </Link>
                                    <CurrencyView value={product.price || 0} className='text-left price' />
                                    <QuantityInput
                                        quantity={product.quantity}
                                        maxLength={2}
                                        onQuantityChangeHandler={(quantity) => onQuantityChange(quantity, index)}
                                    />
                                </td>
                                <td className='text-center'>
                                    <a className='close-cart' onClick={() => removeProduct(index)}>
                                        <i className='fa fa-times-circle' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className='text-right'>Total</td>
                            <td className='text-right'>
                                <CurrencyView value={totalAmount} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </li>
            <li>
                <Link to={MenuPaths.checkout} className='btn pull-right mt_10' onClick={onCheckoutClick}>
                    Thanh toán
                </Link>
            </li>
        </ul>
    )
}

function toggleCartOn(element: HTMLDivElement) {
    element.style.height = `${element.children[0].clientHeight}px`
    element.style.border = '1px solid #e5e5e5'
}

function toggleCartOff(element: HTMLDivElement) {
    element.style.height = '0'
    setTimeout(() => {
        element.style.border = 'none'
    }, 500)
}
