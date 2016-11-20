import React from 'react';
import MapContainer from './mapContainer';
import {shallow, mount, render} from 'enzyme';

    it('should render map container', () => {
        const wrapper= shallow(<MapContainer />);

        // just testing to see if it will shallow render at present

//        expect(wrapper.find('div').length).toEqual(1);
//       expect(wrapper.find('Map').length).toEqual(1);
    });
