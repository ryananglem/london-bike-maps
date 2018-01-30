import React from 'react';
import MapContainer from './mapContainer';
// import {shallow} from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

    it('should render map container', () => {
        const shallow = new ShallowRenderer();
        const wrapper= shallow.render(<MapContainer />);

        //console.log(wrapper.toHtml);
        //console.log(wrapper);
        // just testing to see if it will shallow render at present

//        expect(wrapper.find('div').length).toEqual(1);
//       expect(wrapper.find('Map').length).toEqual(1);
    });
