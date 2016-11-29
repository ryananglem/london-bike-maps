import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withTranslate, IntlActions } from 'react-redux-multilingual'

import Menu from './components/menu';

class App extends Component {
    constructor(props){
        super(props);
        this.languageSelected = this.languageSelected.bind(this);
    }
    languageSelected(locale) {
        this.props.setLocale(locale);
    }
    render() {
        return (<div className="app">
            <Menu
                spaces={this.props.translate('spaces')}
                parks={this.props.translate('parks')}
                settings={this.props.translate('settings')}
                languageSelected={this.languageSelected}
                locale={this.props.locale}
            />
            { this.props.children }
        </div>)
    }
}
function mapStateToProps(state) {
    const { Intl } = state;
    const { locale }  = Intl;
    return {
        locale
    }
}
const mapDispatchToEvents = (dispatch) => {
    return {
        setLocale: (locale) => {
            dispatch(IntlActions.setLocale(locale))
        }
    }
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(App));
