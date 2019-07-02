import React from 'react';
import NearbyStations from './nearbyStations';
// import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

it('should render nearby stations container', () => {
    const shallow = new ShallowRenderer();
    const wrapper= shallow.render(<NearbyStations />);

});
