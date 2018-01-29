import React from 'react';
import About from './about';
import { shallow } from 'enzyme';

it('should render about', () => {
    const companyInfo = <div style={{ fontSize: 'small'}}>
        <span>&copy; 2017 - Radicle Action Development Ltd </span>
    </div>
    const text = {
        appName: 'London cycle map',
        thisProjectReason: '',
        thisProjectUses: '',
        imageDescription: '',
        technology: '',
        writtenBy: ''
    }
    const wrapper= shallow(<About text={text} />)

    expect(wrapper.contains( companyInfo )).toEqual(true)
})
