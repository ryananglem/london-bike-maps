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
        this.recentre = this.recentre.bind(this);
        this.changeZoom = this.changeZoom.bind(this);
    }
    componentDidMount()
    {
        this.props.getAllBikeStations();
    }
    toggleInfoWindow(bikeStation)
    {
        this.props.toggleBikeStationInfoWindow(bikeStation);
        this.props.recenterMap({ lat: bikeStation.coords.lat, lng: bikeStation.coords.lng })
    }
    recentre(coords)
    {
        this.props.recenterMap(coords);
    }
    changeZoom(zoom)
    {
        this.props.zoomMap(zoom);
    }
    render()
    {
        if (this.props.stations===undefined) return null;
        return (
            <div style={{ height: 800 + 'px', width: 1000 + 'px'}}>
                <Map centre={{lat: this.props.coords.lat, lng: this.props.coords.lng }}
                     zoom={this.props.zoom}
                     stations={ this.props.stations }
                     toggleInfoWindow={this.toggleInfoWindow}
                     changeZoom={this.changeZoom}
                     loadingMessage={this.props.translate('loading')} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    //console.log('map statetoprops coords ' + state.rootReducer.mapReducer.coords.lat)
    //console.log('map statetoprops zoom ' + state.rootReducer.mapReducer.zoom)
    const { rootReducer } = state;
    const { bikeStationReducer, mapReducer } = rootReducer;
    const { stations, isFetchingStations,  error } = bikeStationReducer;
    const { coords, zoom } = mapReducer
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


