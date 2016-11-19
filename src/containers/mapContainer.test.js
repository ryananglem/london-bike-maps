import React from 'react';
import MapContainer from './mapContainer';
import {shallow, mount, render} from 'enzyme';

    it('should render map', () => {
        const wrapper= shallow(<MapContainer />);

        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.find('Map').length).toEqual(1);
    });
//}