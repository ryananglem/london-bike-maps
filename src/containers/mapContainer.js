import React, {Component} from 'react';
import Map from '../components/map'
import { connect } from 'react-redux'
import { withTranslate, IntlActions } from 'react-redux-multilingual'
import {getAllBikeStations, toggleBikeStationInfoWindow} from '../actions/getBikeStationsActions';
import {zoomMap, recentreMap } from '../actions/mapActions'

class MapContainer  extends Component  {
    constructor(props) {
        super(props);
        this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
        this.changeBounds = this.changeBounds.bind(this);
        this.changeZoom = this.changeZoom.bind(this);
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
        if (this.props.stations===undefined) return null;
        return (/* // for testing
            <div className="map-sidebar">
                <ul>
                    some items in this list
                    <li>item 1 </li>
                    <li>item 2 </li>
                    <li>item 3 </li>
                    <li>item 4 </li>
                </ul>
            </div>*/
            <div className="map-body">
                <Map centre={{lat: this.props.coords.lat, lng: this.props.coords.lng }}
                     zoom={this.props.zoom}
                     stations={ this.props.stations }
                     toggleInfoWindow={this.toggleInfoWindow}
                     changeZoom={this.changeZoom}
                     changeBounds={this.changeBounds}
                     loadingMessage={this.props.translate('loading')}
                     recenterMap={this.props.recenterMap}
                />

            </div>

        );
    }
}
function mapStateToProps(state) {
    const { rootReducer } = state;
    const { bikeStationReducer, mapReducer, zoomReducer } = rootReducer;
    const { stations, isFetchingStations,  error } = bikeStationReducer;
    const { coords } = mapReducer;
    const { zoom } = zoomReducer;
    return {
        isFetchingStations,
        stations,
        error,
        coords,
        zoom
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
        },
        setLocale: (locale) => {
            dispatch(IntlActions.setLocale(locale))
        }
    };
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(MapContainer));


