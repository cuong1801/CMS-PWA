import loadable from '@loadable/component'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MenuPaths } from '../common/app-constants'
import SSpin from '../vendors/spin'

export const lazyOptions = {
    fallback: (
        <div
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                height: '100vh',
                width: '100%'
            }}>
            <SSpin />
        </div>
    )
}

const Home = loadable(() => import('../../pages/home'), lazyOptions)
const Product = loadable(() => import('../../pages/product'), lazyOptions)
const AboutUs = loadable(() => import('../../pages/about-us'), lazyOptions)
const Checkout = loadable(() => import('../../pages/checkout'), lazyOptions)
const NotFoundPage = loadable(() => import('../../pages/not-found'), lazyOptions)
const Company = loadable(() => import('../../pages/company'), lazyOptions)
const DetailProduct = loadable(() => import('../../pages/product-detail'), lazyOptions)

const routeList = [
    <Route key='1' path={MenuPaths.home} exact component={Home} />,
    <Route key='2' path={MenuPaths.product} exact component={Product} />,
    <Route key='3' path={MenuPaths.aboutUs} exact component={AboutUs} />,
    <Route key='4' path={MenuPaths.checkout} exact component={Checkout} />,
    <Route key='5' path={MenuPaths.company} exact component={Company} />,
    <Route key='6' path={MenuPaths.product + '/:id'} exact component={DetailProduct} />
]

export default function AppRouting(): JSX.Element {
    return (
        <Switch>
            {routeList.map((route) => route)}
            <Route path='*' component={NotFoundPage} />
        </Switch>
    )
}
