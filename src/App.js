import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';
import { withTranslate, IntlActions } from 'react-redux-multilingual';
import { filterByParks, filterByBikes } from './actions/filterActions';
import { stationSearch } from './actions/searchActions';
import { recenterMap } from './actions/mapActions';
import * as constants from './config/constants'

import Menu from './components/menu';

class App extends Component {

    searchStations = (searchText) => {
        if (searchText) {
            Promise.resolve( this.props.searchStations(searchText) )
                .then(() => {
                    if (this.props.searchResults!==undefined) {
                        this.props.recenterMap({
                            lat: this.props.searchResults.coords.lat,
                            lng: this.props.searchResults.coords.lng
                        })
                    }
            })
        }
    }
    languageSelected = (locale) => {
        this.props.setLocale(locale);
    }
    changeFilter = (filter) =>{
        if (filter===constants.BIKES_AVAILABLE) {
            this.props.filterByBikes();
        }
        else {
            this.props.filterByParks();
        }
    }
    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.props.stations.filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }
    render() {
        const translatedText = {
            spaces: this.props.translate('spaces'),
            bikes: this.props.translate('bikes'),
            settings: this.props.translate('settings'),
            appName: this.props.translate('appName'),
            search: this.props.translate('search')
        };
        return (<div className="app">
            <Menu
                text={translatedText}
                languageSelected={this.languageSelected}
                locale={this.props.locale}
                filter={this.props.filter}
                changeFilter={this.changeFilter}
                searchStations={this.searchStations}
                getSuggestions={this.getSuggestions}
            />
            { this.props.children }
        </div>)
    }
}
function mapStateToProps(state) {
    const { Intl, rootReducer } = state;
    const { filterReducer, bikeStationReducer, searchReducer } = rootReducer;
    const { stations } =  bikeStationReducer;
    const { searchResults } = searchReducer;
    const { locale }  = Intl;
    const { filter } = filterReducer;
    return {
        locale,
        filter,
        stations,
        searchResults
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
        },
        searchStations: searchText => {
            dispatch(stationSearch(searchText))
        },
        recenterMap: (coords) => {
            dispatch(recenterMap(coords))
        }
    }
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(App));
