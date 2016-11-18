import React from 'react';
import MapContainer from './mapContainer';
import {shallow, mount, render} from 'enzyme';


    it('should render map', () => {
        const wrapper= shallow(<MapContainer />);
        const stations = [ { id: 1, coords: { lat: 51.5, lng: 0 }}, { id: 2, coords: { lat: 51.51, lng: -0.05 }} ];
        const map = (<Map centre={{ lat: 51.53, lng: -0.1}} stations={ stations } />);

        expect(wrapper.find('Map').length).toEqual(1);
    });
//}