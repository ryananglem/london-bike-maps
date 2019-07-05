import React, { Component } from 'react'
import Map from '../components/map'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import {
    getAllBikeStations,
    toggleBikeStationInfoWindow,
} from '../actions/getBikeStationsActions'
import { zoomMap, recenterMap } from '../actions/mapActions'
import NearbyStations from './nearbyStations'

class MapContainer extends Component {
    componentDidMount = () => {
        this.props.getAllBikeStations()
    }
    toggleInfoWindow = bikeStation => {
        this.props.toggleBikeStationInfoWindow(bikeStation)
    }
    percentAvailable = (filter, station) => {
        return filter === 'BIKES_AVAILABLE'
            ? (parseInt(station.bikes, 10) / parseInt(station.totalDocks, 10)) *
                  100
            : (parseInt(station.spaces, 10) /
                  parseInt(station.totalDocks, 10)) *
                  100
    }
    displayColour = percentage => {
        return percentage < 10.0
            ? 'danger'
            : percentage < 20.0
            ? 'warning'
            : 'success'
    }
    changeZoom = zoom => {
        this.props.zoomMap(zoom)
    }
    render() {
        const translatedText = {
            bikesFree: this.props.translate('bikesFree'),
            spacesFree: this.props.translate('spacesFree'),
            terminalName: this.props.translate('terminalName'),
            totalSpaces: this.props.translate('totalSpaces'),
        }
        if (this.props.stations === undefined) return null
        return (
            <div data-testid="map-page" className="map-container">
                <div className="map-body">
                    <Map
                        centre={{
                            lat: this.props.coords.lat,
                            lng: this.props.coords.lng,
                        }}
                        zoom={this.props.level}
                        stations={this.props.stations}
                        displayColour={this.displayColour}
                        percentage={this.percentAvailable}
                        toggleInfoWindow={this.toggleInfoWindow}
                        infoWindowText={translatedText}
                        changeZoom={this.changeZoom}
                        changeBounds={this.changeBounds}
                        loadingMessage={this.props.translate('loading')}
                        recenterMap={this.props.recenterMap}
                        filter={this.props.filterValue}
                    />
                </div>
                <div className="map-sidebar">
                    <NearbyStations />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    const { root } = state
    const { bikeStation, map, filter, search } = root
    const { stations, isFetchingStations, error } = bikeStation
    const { searchResults } = search
    const { coords, zoom } = map
    const { value } = filter
    return {
        isFetchingStations,
        stations,
        error,
        coords,
        zoom,
        filterValue: value,
        searchResults,
    }
}
const mapDispatchToEvents = dispatch => {
    return {
        toggleBikeStationInfoWindow: bikeStation =>
            dispatch(toggleBikeStationInfoWindow(bikeStation)),
        getAllBikeStations: () => dispatch(getAllBikeStations()),
        recenterMap: coords => dispatch(recenterMap(coords)),
        zoomMap: zoom => dispatch(zoomMap(zoom)),
    }
}
export default withTranslate(
    connect(
        mapStateToProps,
        mapDispatchToEvents
    )(MapContainer)
)
