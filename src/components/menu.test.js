import React from 'react';
// import {shallow} from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
 import Menu from './menu';

it('renders menu without crashing', () => {
    // const div = document.createElement('div');

    const shallow = new ShallowRenderer();
    
    const wrapper= shallow.render(
            <Menu   text={{translatedText: 'some text'}} 
                    locale="en"
                    languageSelected={ () => { }}
                    changeFilter={ () => {}}
                    filter=""
                    searchStations={ () => {}}
                    getSuggestions={ () => {}}
    />);
    
});

