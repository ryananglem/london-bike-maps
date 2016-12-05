import React, {Component} from 'react';
import Map from '../components/map'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import {getAllBikeStations, toggleBikeStationInfoWindow} from '../actions/getBikeStationsActions';
import {zoomMap, recentreMap } from '../actions/mapActions'

class MapContainer  extends Component  {
    constructor(props) {
        super(props);
        this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
        this.changeBounds = this.changeBounds.bind(this);
        this.changeZoom = this.changeZoom.bind(this);
        this.displayColour = this.displayColour.bind(this);
        this.percentAvailable = this.percentAvailable.bind(this);
    }
    componentDidMount()
    {
        this.props.getAllBikeStations();
    }
    toggleInfoWindow(bikeStation)
    {
        this.props.toggleBikeStationInfoWindow(bikeStation);
        // not sure I want to recenter the map when toggling infowindow anymore
        //this.props.recenterMap({ lat: bikeStation.coords.lat, lng: bikeStation.coords.lng })
    }
    percentAvailable(filter, station) {
        return (filter==="BIKES_AVAILABLE")
            ? (parseInt(station.bikes, 10) / parseInt(station.totalDocks, 10)) * 100
            : (parseInt(station.spaces, 10) / parseInt(station.totalDocks, 10)) * 100;
    }
    displayColour(percentage) {
        return (percentage < 10.0) ? 'danger' : (percentage < 20.0) ? 'warning' : 'success';
    }

    changeBounds(coords)
    {
        //this.props.changeBounds()
    }
    changeZoom(zoom)
    {
        this.props.zoomMap(zoom);
    }
    render()
    {
        const translatedText = {
            bikesFree: this.props.translate('bikesFree'),
            spacesFree: this.props.translate('spacesFree'),
            terminalName: this.props.translate('terminalName'),
            totalSpaces: this.props.translate('totalSpaces')
        };
        if (this.props.stations===undefined) return null;
        return (/* // for testing
            <div className="map-sidebar">
                <ul>
                    nearby stations
                    <li>item 1 </li>
                    <li>item 2 </li>
                    <li>item 3 </li>
                    <li>item 4 </li>
                </ul>
            </div>*/
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
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { rootReducer } = state;
    const { bikeStationReducer, mapReducer, zoomReducer, filterReducer } = rootReducer;
    const { stations, isFetchingStations,  error } = bikeStationReducer;
    const { coords } = mapReducer;
    const { zoom } = zoomReducer;
    const { filter } = filterReducer;
    return {
        isFetchingStations,
        stations,
        error,
        coords,
        zoom,
        filter
    }
}
const mapDispatchToEvents = (dispatch) => {
    return {
        toggleBikeStationInfoWindow: (bikeStation) => {
            dispatch(toggleBikeStationInfoWindow(bikeStation))
        },
        getAllBikeStations: () => {
            dispatch(getAllBikeStations())
        },
        recenterMap: (coords) => {
            dispatch(recentreMap(coords))
        },
        zoomMap: (zoom) => {
            dispatch(zoomMap(zoom))
        }
    };
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(MapContainer));


