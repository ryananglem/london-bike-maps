import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withTranslate, IntlActions } from 'react-redux-multilingual'
import { filterByParks, filterByBikes } from './actions/filterActions'

import Menu from './components/menu';

class App extends Component {
    constructor(props){
        super(props);
        this.languageSelected = this.languageSelected.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }
    languageSelected(locale) {
        this.props.setLocale(locale);
    }
    changeFilter(filter){
        if (filter==='BIKES_AVAILABLE') {
            this.props.filterByBikes();
        }
        else {
            this.props.filterByParks();
        }
    }

    render() {
        const translatedText = {
            spaces: this.props.translate('spaces'),
            bikes: this.props.translate('bikes'),
            settings: this.props.translate('settings'),
            appName: this.props.translate('appName')
        };
        return (<div className="app">
            <Menu
                text={translatedText}
                languageSelected={this.languageSelected}
                locale={this.props.locale}
                filter={this.props.filter}
                changeFilter={this.changeFilter}
            />
            { this.props.children }
        </div>)
    }
}
function mapStateToProps(state) {
    const { Intl, rootReducer } = state;
    const { filterReducer } = rootReducer;
    const { locale }  = Intl;
    const { filter } = filterReducer;
    return {
        locale,
        filter
    }
}
const mapDispatchToEvents = (dispatch) => {
    return {
        setLocale: (locale) => {
            dispatch(IntlActions.setLocale(locale))
        },
        filterByBikes: () => {
            dispatch(filterByBikes())
        },
        filterByParks: () => {
            dispatch(filterByParks())
        }
    }
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(App));
