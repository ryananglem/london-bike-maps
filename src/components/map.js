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
        const infoWindowsOpen = this.props.stations.map(() => false);
        const centre = this.props.centre || {
                lat: 51.5,
                lng: 0,
            };
        this.state = {
            infoWindows: infoWindowsOpen,
            centre: centre
        };
    }
    toggleInfoWindow(index) {
        const {infoWindows} = this.state;
        infoWindows[index] = !infoWindows[index];
        this.setState({
            infoWindows,
        });
    }
    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: false
        });
    }
    onCloseClicked(index) {
        this.toggleInfoWindow(index)
    }
    onMarkerClicked(index){
        const newCentre = {
            lat: this.props.stations[index-1].coords.lat,
            lng: this.props.stations[index-1].coords.lng
        };
        this.setState({
            centre: newCentre
        });
        this.toggleInfoWindow(index)
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
        const { infoWindows } = this.state;
        return this.props.stations.map((station) => {
            if (!infoWindows[station.id]) return null;
            let stationInfo = ReactDOMServer.renderToStaticMarkup(<StationInfo station={station} />);
            return (
                <InfoWindow key={station.id}
                            lat={station.coords.lat + 0.001}
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
                    width={'100%'}
                    height={'100%'}
                    lat={this.state.centre.lat}
                    lng={this.state.centre.lng}
                    zoom={13}
                    loadingMessage={this.props.loadingMessage || 'Loading...'}
                    params={{v: '3.exp', key:process.env.REACT_APP_GOOGLE_MAP_KEY}}
                    onMapCreated={this.onMapCreated}>
                    >
                    <Circle
                        lat={this.state.centre.lat}
                        lng={this.state.centre.lng}
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
    loadingMessage: PropTypes.string,
    stations: PropTypes.array.isRequired,
};
export default Map;
