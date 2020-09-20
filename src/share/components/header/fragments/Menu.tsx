import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { MenuPaths } from '../../../common/app-constants'
import '../style/menu.scss'

const Menu = forwardRef<HTMLDivElement>((_, menuRef) => (
    <div ref={menuRef} className='navbar-collapse pull-right'>
        <ul id='menu' className='nav navbar-nav'>
            <li>
                <Link to={MenuPaths.home}>Trang chủ</Link>
            </li>
            <li>
                <Link to={MenuPaths.aboutUs}>Giới thiệu</Link>
            </li>
            <li>
                <Link to={MenuPaths.product}>Sản phẩm</Link>
            </li>
            <li>
                <Link to={MenuPaths.company}>Doanh nghiệp</Link>
            </li>
        </ul>
    </div>
))
export default Menu
