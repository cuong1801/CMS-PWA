import React, { Fragment, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { MenuPaths } from './share/common/app-constants'
import Breadcrumb from './share/components/breadcrumb'
import Header from './share/components/header'
import AppRouting from './share/routing'

function App(): JSX.Element {
    const breadcrumbRef = useRef<HTMLDivElement>(null)
    const history = useHistory()

    useEffect(() => {
        history.listen((listener) => {
            if (breadcrumbRef.current) {
                if (listener.pathname === MenuPaths.home) breadcrumbRef.current.style.display = 'none'
                else breadcrumbRef.current.style.display = 'block'
            }
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })
    }, [])

    const displayType = location.pathname === MenuPaths.home ? 'none' : 'block'
    return (
        <Fragment>
            <div className='wrapper'>
                <Header />
                <div className='container'>
                    <Breadcrumb ref={breadcrumbRef} display={displayType} />
                    <AppRouting />
                </div>
            </div>
            <div className='footer'>
                <div className='footer-bottom mt_30 ptb_10'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='copyright-part'>© Bản quyền thuộc về S-CHANCE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default App
