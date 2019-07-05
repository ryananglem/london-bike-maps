import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import createBrowserHistory from 'history/createBrowserHistory'
import { Router } from 'react-router'
import {
    syncHistoryWithStore,
    routerReducer as routing,
} from 'react-router-redux'

import translations from './translations'
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import root from './reducers/rootReducer'
const reducers = combineReducers(Object.assign({}, { Intl, root, routing }))

let store
if (
    process.env === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
    store = createStore(
        reducers,
        compose(
            applyMiddleware(thunk),
            composeWithDevTools()
        )
    )
} else {
    store = createStore(reducers, compose(applyMiddleware(thunk)))
}

const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider translations={translations}>
            <Router history={history}>{routes}</Router>
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
)
