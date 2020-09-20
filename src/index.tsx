import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
