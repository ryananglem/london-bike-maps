import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';

import {Gmaps, InfoWindow , Marker, Circle } from 'react-gmaps';
import BikeIcon from '../content/images/cycle-hire-pushpin-icon.gif'
import DangerIcon  from '../content/images/cycle-hire-pushpin-icon-danger.gif'
import StationInfo from './stationInfo'

const params = {v: '3.exp', key:process.env.REACT_APP_GOOGLE_MAP_KEY};

class Map extends Component {

    constructor(props) {
        super(props);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this.onCloseClicked = this.onCloseClicked.bind(this);
        this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
        this.changeZoom = this.changeZoom.bind(this);
        this.changeBounds = this.changeBounds.bind(this);
        this.recenterMap = this.recenterMap.bind(this);
        this.onDblClick = this.onDblClick.bind(this);
    }
    changeZoom() {
        const zoom = this.gmap.getMap().getZoom();
        this.props.changeZoom(zoom);
    }
    recenterMap(coords) {
        this.props.recenterMap(coords);
    }
    changeBounds(){
        //console.log('change bounds')
        this.props.changeBounds();
    }
    toggleInfoWindow(bikeStationId) {
        const bikeStation = this.props.stations.find(s => s.id === bikeStationId);
        this.props.toggleInfoWindow(bikeStation);
    }
    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true,
        });
    }
    onDblClick(e) {
        //console.log({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        /*this.recenterMap( {
            lat: 51.506451,
            lng: -0.170279
        })*/
    }
    onCloseClicked(stationId) {
        this.toggleInfoWindow(stationId)
    }
    onMarkerClicked(stationId){
        this.toggleInfoWindow(stationId)
    }
    renderStationMarkers() {
        return this.props.stations.map((station) => {
            const percentage = this.props.percentage(this.props.filter, station);
            const colour = this.props.displayColour(percentage);
            return (
                <Marker key={station.id}
                        lat={station.coords.lat}
                        lng={station.coords.lng}
                        icon={ (colour==="danger") ? DangerIcon : BikeIcon }
                        onDblClick={this.onDblClick}
                        draggable={false}
                        onClick={ () => this.onMarkerClicked(station.id)}
                />
            )
        });
    }
    renderStationInfoWindows() {
        return this.props.stations.map((station) => {
            const percentage = this.props.percentage(this.props.filter, station);
            const colour = this.props.displayColour(percentage);
            if (!station.infoWindowIsOpen) return null;
            let stationInfo = ReactDOMServer.renderToStaticMarkup(
                <StationInfo filter={this.props.filter} text={ this.props.infoWindowText }
                             displayColour={ colour}
                             percentage={ percentage }
                             station={station} />);
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
        return (
                <Gmaps
                    ref={(googleMap) => this.gmap = googleMap}
                    width={'100%'}
                    height={'100%'}
                    lat={this.props.centre.lat}
                    lng={this.props.centre.lng}
                    zoom={14}
                    onZoomChanged={this.changeZoom}
                    onBoundsChanged={this.changeBounds}
                    loadingMessage={this.props.loadingMessage || 'Loading...'}
                    params={params}
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
    infoWindowText: PropTypes.object.isRequired,
    changeZoom: PropTypes.func,
    changeBounds: PropTypes.func,
    recenterMap: PropTypes.func,
    filter: PropTypes.string.isRequired,
    displayColour: PropTypes.func.isRequired,
    percentage: PropTypes.func.isRequired
};
export default Map;

