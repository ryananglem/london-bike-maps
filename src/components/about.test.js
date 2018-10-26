import React from 'react';
import About from './about';
// import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

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
    const shallow = new ShallowRenderer();
    const wrapper= shallow.render(<About text={text} />)
    
    // expect(wrapper.contains( companyInfo )).toEqual(true)
})
