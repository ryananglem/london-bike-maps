import React from 'react';
import {shallow} from 'enzyme';
import Menu from './menu';

it('renders menu without crashing', () => {
    const div = document.createElement('div');

    shallow(<Menu text={{translatedText: 'some text'}} locale="en"
                  languageSelected={ () => { }} changeFilter={ () => {}} filter="" />);
});
