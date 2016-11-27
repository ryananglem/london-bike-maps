import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';

import {Gmaps, InfoWindow , Marker, Circle } from 'react-gmaps';
import BikeIcon from '../content/images/cycle-hire-pushpin-icon.gif'
import StationInfo from './stationInfo'

class Map extends Component {

    constructor(props) {
        super(props);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this.onCloseClicked = this.onCloseClicked.bind(this);
        this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
        this.changeZoom = this.changeZoom.bind(this);

    }
    changeZoom() {
        /*
        const zoom = this.refs.Gmap.getMap().getZoom()
        console.log( 'zoom ' + zoom )
        this.props.changeZoom(zoom);
        */
    }
    toggleInfoWindow(bikeStationId) {
        const bikeStation = this.props.stations.find(s => s.id === bikeStationId);
        this.props.toggleInfoWindow(bikeStation);
    }
    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }
    onCloseClicked(stationId) {
        this.toggleInfoWindow(stationId)
    }
    onMarkerClicked(stationId){
        this.toggleInfoWindow(stationId)
    }
    renderStationMarkers() {
        return this.props.stations.map((station) => {
            return (
                <Marker key={station.id}
                        lat={station.coords.lat}
                        lng={station.coords.lng}
                        icon={BikeIcon}
                        draggable={false}
                        onClick={ () => this.onMarkerClicked(station.id)}
                />
            )
        });
    }
    renderStationInfoWindows() {
        return this.props.stations.map((station) => {
            if (!station.infoWindowIsOpen) return null;
            let stationInfo = ReactDOMServer.renderToStaticMarkup(<StationInfo station={station} />);
            return (
                <InfoWindow key={station.id}
                            lat={station.coords.lat + 0.0001}
                            lng={station.coords.lng}
                            content={stationInfo}
                            draggable={false}
                            onCloseClick={() => this.onCloseClicked(station.id)}
                />
            )
        });
    }
    render() {
        //   ref={(googleMap) => this.gmap = googleMap}
        //   zoom={this.props.zoom}
        return (
                <Gmaps
                    width={'100%'}
                    height={'100%'}
                    lat={this.props.centre.lat}
                    lng={this.props.centre.lng}
                    zoom={14}
                    zoom_changed={this.changeZoom}
                    loadingMessage={this.props.loadingMessage || 'Loading...'}
                    params={{v: '3.exp', key:process.env.REACT_APP_GOOGLE_MAP_KEY}}
                    onMapCreated={this.onMapCreated}>
                    >
                    <Circle
                        lat={this.props.centre.lat}
                        lng={this.props.centre.lng}
                        radius={500}
                        strokeWeight={1}
                        strokeColor={'#FF0000'}
                        strokeOpacity={0.8}
                        fillColor={'#FF0000'}
                        fillOpacity={0.35}
                    />
                    {this.renderStationMarkers()}
                    {this.renderStationInfoWindows()}
                </Gmaps>
        )
    }
}
Map.propTypes= {
    centre: PropTypes.object,
    zoom: PropTypes.number,
    loadingMessage: PropTypes.string,
    stations: PropTypes.array.isRequired,
    toggleInfoWindow: PropTypes.func.isRequired,
    changeZoom: PropTypes.func
};
export default Map;

