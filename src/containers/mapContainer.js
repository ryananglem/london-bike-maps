import React, {Component} from 'react';
import Map from '../components/map'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { bindActionCreators} from 'redux'
import { withTranslate } from 'react-redux-multilingual'
import {getAllBikeStations, toggleBikeStationInfoWindow} from '../actions/getBikeStationsActions';
import {zoomMap, recenterMap } from '../actions/mapActions'

class MapContainer extends Component  {

    componentDidMount = () =>  {
        this.props.getAllBikeStations();
    }
    toggleInfoWindow = (bikeStation) => {
        this.props.toggleBikeStationInfoWindow(bikeStation);
    }
    percentAvailable = (filter, station) => {
        return (filter==="BIKES_AVAILABLE")
            ? (parseInt(station.bikes, 10) / parseInt(station.totalDocks, 10)) * 100
            : (parseInt(station.spaces, 10) / parseInt(station.totalDocks, 10)) * 100;
    }
    displayColour = (percentage) => {
        return (percentage < 10.0) ? 'danger' : (percentage < 20.0) ? 'warning' : 'success';
    }
    changeBounds = (coords) =>  {
        //this.props.changeBounds()
    }
    changeZoom = (zoom) =>  {
        this.props.zoomMap(zoom);
    }
    render() {
        const translatedText = {
            bikesFree: this.props.translate('bikesFree'),
            spacesFree: this.props.translate('spacesFree'),
            terminalName: this.props.translate('terminalName'),
            totalSpaces: this.props.translate('totalSpaces')
        };
        if (this.props.stations===undefined) return null;
        return (
            <div style={{textAlign: 'left'}}>
                <div className="map-body">
                    <Map centre={{lat: this.props.coords.lat, lng: this.props.coords.lng }}
                         zoom={this.props.zoom}
                         stations={ this.props.stations }
                         displayColour={ this.displayColour}
                         percentage={this.percentAvailable}
                         toggleInfoWindow={this.toggleInfoWindow}
                         infoWindowText={ translatedText }
                         changeZoom={this.changeZoom}
                         changeBounds={this.changeBounds}
                         loadingMessage={this.props.translate('loading')}
                         recenterMap={this.props.recenterMap}
                         filter={this.props.filter}
                    />
                </div>
                <div className="map-sidebar">
                    { this.props.children }
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state) =>  {
    const { rootReducer } = state;
    const { bikeStationReducer, mapReducer, zoomReducer, filterReducer, searchReducer } = rootReducer;
    const { stations, isFetchingStations,  error } = bikeStationReducer;
    const { searchResults } = searchReducer;
    const { coords } = mapReducer;
    const { zoom } = zoomReducer;
    const { filter } = filterReducer;
    return {
        isFetchingStations,
        stations,
        error,
        coords,
        zoom,
        filter,
        searchResults
    }
}
const mapDispatchToEvents=(dispatch) => {
    return {
        toggleBikeStationInfoWindow: (bikeStation) => {
            dispatch(toggleBikeStationInfoWindow(bikeStation))
        },
        getAllBikeStations: () => {
            dispatch(getAllBikeStations())
        },
        recenterMap: (coords) => {
            dispatch(recenterMap(coords))
        },
        zoomMap: (zoom) => {
            dispatch(zoomMap(zoom))
        }
    };
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(MapContainer));
