import React, { Component, PropTypes } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

class Map extends Component {
    render() {
        const centre = this.props.centre || {
            lat: 51.5,
            lng: 0,
        };

        /*
         <InfoWindow
         lat={coords.lat}
         lng={coords.lng}
         content={'Hello, React :)'}
         onCloseClick={this.onCloseClick} />
         <Circle
         lat={coords.lat}
         lng={coords.lng}
         radius={500}
         onClick={this.onClick} />
         */
        return (
                <Gmaps
                    width={'100%'}
                    height={'100%'}
                    lat={centre.lat}
                    lng={centre.lng}
                    zoom={12}
                    loadingMessage={this.props.loadingMessage || 'Loading...'}
                    params={{v: '3.exp', key:process.env.REACT_APP_GOOGLE_MAP_KEY}}
                    onMapCreated={this.onMapCreated}>
                    >
                    {
                        this.props.stations.map((station) => {
                            return (<Marker key={station.id}
                                lat={station.coords.lat}
                                lng={station.coords.lng}
                                draggable={false}
                            />)
                        })
                    }
                </Gmaps>
        )

    }
}
Map.propTypes= {
    centre: PropTypes.object,
    loadingMessage: PropTypes.string,
    stations: PropTypes.array.isRequired,
}
export default Map;