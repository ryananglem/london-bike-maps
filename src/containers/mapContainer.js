import React, {Component} from 'react';
import Map from '../components/map'

export default class MapContainer extends Component {
    render() {
        const stations = [ { id: 1, coords: { lat: 51.5, lng: 0 }}, { id: 2, coords: { lat: 51.51, lng: -0.05 }} ];
        return (
            <div style={{ height: 600 + 'px', width: 800 + 'px'}}>
                <Map centre={{ lat: 51.53, lng: -0.1}} stations={ stations } />
            </div>
        );
    }
}


