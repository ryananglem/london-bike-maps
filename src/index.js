import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router'
import routes from './config/routes'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import translations from './translations';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual';
import { reducer as formReducer } from 'redux-form';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer';
const reducers = combineReducers(Object.assign({},
    { Intl, form: formReducer, rootReducer }
    ));
let store;

if (process.env.NODE_ENV==='development')
    store = createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
else
    store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider translations={translations}>
            <Router history={hashHistory}>{routes}</Router>
        </IntlProvider>
    </Provider>,
  document.getElementById('root')
);
