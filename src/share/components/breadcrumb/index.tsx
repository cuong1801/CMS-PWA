import React, { forwardRef, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { MenuPaths } from '../../common/app-constants'
import { isNullOrUndefined } from '../../utils/empty-util'
import './style/index.scss'

const breadcrumbMap = Object.freeze({
    [`${MenuPaths.company}`]: 'Doanh nghiệp',
    [`${MenuPaths.product}`]: 'Sản phẩm',
    [`${MenuPaths.aboutUs}`]: 'Giới thiệu',
    [`${MenuPaths.checkout}`]: 'Thanh toán',
    ['chi-tiet']: 'Chi tiết'
})

type DisplayType = { display: string }
const Breadcrumb = forwardRef<HTMLDivElement, DisplayType>((props, divRef) => {
    const displayType = props.display
    const InnerBreadcrumb = withRouter((props) => {
        const { location } = props
        const pathSnippets = location.pathname.split('/').filter((i) => i)

        const extraBreadcrumbItems = pathSnippets.map((pathName, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
            const displayName = breadcrumbMap[url] || breadcrumbMap[pathName]

            if (isNullOrUndefined(displayName)) return <Fragment />

            if (pathName.includes('chi-tiet')) {
                return <Fragment key={url}>{displayName}</Fragment>
            }
            return (
                <Link key={url} to={url}>
                    {displayName}
                </Link>
            )
        })

        const breadcrumbItems = [
            <Fragment key='-1'>
                {location.pathname === '/' ? (
                    <Fragment>Trang chủ</Fragment>
                ) : (
                    <Link to={MenuPaths.home}>
                        Trang chủ
                        <i className='ion-chevron-right' />
                    </Link>
                )}
            </Fragment>
        ].concat(extraBreadcrumbItems)

        return (
            <div ref={divRef} id='breadcrumb-schance' style={{ display: displayType }}>
                {breadcrumbItems}
            </div>
        )
    })
    return <InnerBreadcrumb />
})

export default Breadcrumb
