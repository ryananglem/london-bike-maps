import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router'
import routes from './config/routes'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import translations from './translations'
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

let reducers = combineReducers(Object.assign({}, { Intl, form: formReducer }));
let store;
if (process.env.NODE_ENV==='development')
    store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
else
    store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider translations={translations}>
            <Router history={hashHistory}>{routes}</Router>
        </IntlProvider>
    </Provider>,
  document.getElementById('root')
);
