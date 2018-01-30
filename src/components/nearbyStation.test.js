import React from 'react';
import NearbyStation from './nearbyStation';
// import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

it('should render nearby station info', () => {
    const station = { id: 1, distance: 23.234566, name:'King Edward Park', coords: { lat: 51.5, lng: 0 }};
    const shallow = new ShallowRenderer();
    const wrapper= shallow.render(<NearbyStation
        station={ station }
        text={{ test: 'text'}}
     />);

    // expect(wrapper.contains('King Edward Park')).toEqual(true);
});

