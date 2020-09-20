import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import { MenuPaths } from '../../common/app-constants'
import Cart from './fragments/Cart'
import Menu from './fragments/Menu'
import './style/index.scss'

export default function Header(): JSX.Element {
    const menuRef = useRef<HTMLDivElement>(null)

    const onToggleMenu = () => {
        if (window.innerWidth <= 991 && menuRef.current) {
            if (menuRef.current.style.opacity === '1') {
                toggleMenuOff(menuRef.current)
            } else {
                toggleMenuOn(menuRef.current)
            }
        }
    }

    return (
        <header id='header'>
            <div className='header-top'>
                <div className='header'>
                    <div className='container'>
                        <nav className='navbar'>
                            <div className='navbar-header mtb_20'>
                                <Link className='navbar-brand' to={MenuPaths.home}>
                                    <img alt='Schance' src={logo} />
                                </Link>
                            </div>
                            <div className='header-right pull-right'>
                                <button
                                    onClick={onToggleMenu}
                                    className='navbar-toggle pull-left'
                                    type='button'
                                    data-toggle='collapse'
                                    data-target='#js-navbar-collapse'>
                                    <span className='i-bar'>
                                        <i className='fa fa-bars' />
                                    </span>
                                </button>
                                <Cart />
                            </div>
                            <Menu ref={menuRef} />
                        </nav>
                    </div>
                </div>
                <div className='header-bottom'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-12 col-lg-12'>
                                <div className='header-bottom-right offers'>
                                    <div className='marquee'>
                                        <span>
                                            <i className='fa fa-circle' aria-hidden='true' />
                                            Cần lắm những ngôi trường ấm áp
                                        </span>
                                        <span>
                                            <i className='fa fa-circle' aria-hidden='true' />
                                            Cho đi sẽ nhận lại
                                        </span>
                                        <span>
                                            <i className='fa fa-circle' aria-hidden='true' />
                                            Nụ cười hồn nhiên giữa muôn bề thiếu thốn
                                        </span>
                                        <span>
                                            <i className='fa fa-circle' aria-hidden='true' />
                                            Những mảnh đời khó khăn
                                        </span>
                                        <span>
                                            <i className='fa fa-circle' aria-hidden='true' />
                                            Trẻ em vùng cao
                                        </span>
                                        <span>
                                            <i className='fa fa-circle' aria-hidden='true' />
                                            Cho đi là chúng ta sẽ được nhận lại
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

function toggleMenuOn(element: HTMLDivElement) {
    element.style.display = 'block'
    element.style.opacity = '1'
}

function toggleMenuOff(element: HTMLDivElement) {
    element.style.opacity = '0'
    setTimeout(() => {
        element.style.display = 'none'
    }, 500)
}
