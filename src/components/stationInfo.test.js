import React from 'react';
import StationInfo from './stationInfo';
import { shallow } from 'enzyme';

it('should render station info', () => {
    const station = { id: 1, name:'King Edward Park', coords: { lat: 51.5, lng: 0 }};
    const wrapper= shallow(<StationInfo
                                    filter="BIKES_AVAILABLE"
                                    station={ station }
                                    text={{ test: 'text'}}
                                    displayColour="success"
                                    percentage={ 90 }
                                />);

    expect(wrapper.contains('King Edward Park')).toBe(true);
});

