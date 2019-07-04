import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { withTranslate, IntlActions } from 'react-redux-multilingual'
import { filterByParks, filterByBikes } from './actions/filterActions'
import { stationSearch } from './actions/searchActions'
import { recenterMap } from './actions/mapActions'
import * as constants from './config/constants'

import Menu from './components/menu'

class App extends Component {
    searchStations = searchText =>
        searchText && this.props.searchStations(searchText)

    languageSelected = locale => {
        this.props.setLocale(locale)
    }
    changeFilter = filter => {
        if (filter === constants.BIKES_AVAILABLE) {
            this.props.filterByBikes()
        } else {
            this.props.filterByParks()
        }
    }
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length

        return inputLength === 0
            ? []
            : this.props.stations.filter(
                  lang =>
                      lang.name.toLowerCase().slice(0, inputLength) ===
                      inputValue
              )
    }
    render() {
        const { translate, locale, filterValue } = this.props
        const translatedText = {
            spaces: translate('spaces'),
            bikes: translate('bikes'),
            settings: translate('settings'),
            appName: translate('appName'),
            search: translate('search'),
        }
        return (
            <div className="app">
                <Menu
                    text={translatedText}
                    languageSelected={this.languageSelected}
                    locale={locale}
                    filter={filterValue}
                    changeFilter={this.changeFilter}
                    searchStations={this.searchStations}
                    getSuggestions={this.getSuggestions}
                    setSelectedValue={this.props.setSelectedValue}
                />
                {this.props.children}
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { Intl, root } = state
    const { filter, bikeStation, search } = root
    const { stations } = bikeStation
    const { searchResults } = search
    const { locale } = Intl
    const { value } = filter
    return {
        locale,
        filterValue: value,
        stations,
        searchResults,
    }
}
const mapDispatchToEvents = dispatch => {
    return {
        setLocale: locale => {
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
        recenterMap: coords => {
            dispatch(recenterMap(coords))
        },
        setSelectedValue: value => {
            dispatch(stationSearch(value.name))
            // dispatch(selectStation(value));
        },
    }
}
export default withTranslate(
    connect(
        mapStateToProps,
        mapDispatchToEvents
    )(App)
)
