import React from 'react';
import NearbyStation from './nearbyStation';
import { shallow } from 'enzyme';

it('should render nearby station info', () => {
    const station = { id: 1, distance: 23.234566, name:'King Edward Park', coords: { lat: 51.5, lng: 0 }};
    const wrapper= shallow(<NearbyStation
        filter="BIKES_AVAILABLE"
        station={ station }
        text={{ test: 'text'}}
        displayColour="success"
        percentage={ 90 }
    />);

    expect(wrapper.contains('King Edward Park')).toBe(true);
});

