import React from 'react';
import Map from './map';
import { shallow } from 'enzyme';

it('should render map', () => {
    const stations = [
        { id: 1, name:'King Edward Park', coords: { lat: 51.5, lng: 0 }},
        { id: 2, name:'North Greenwich', coords: { lat: 51.51, lng: -0.05 }}
    ];
    const wrapper= shallow(<Map centre={{ lat: 51.53, lng: -0.1}}
                                stations={ stations }
                                loadingMessage={'loading'}
                                toggleInfoWindow={ () => { }}

                            />);

    expect(wrapper.find('Gmaps').length).toEqual(1);
});
