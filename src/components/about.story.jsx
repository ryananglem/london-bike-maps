import * as React from 'react'
import { storiesOf } from '@storybook/react'
import About from './about'
import translations from '../translations'

storiesOf('About', module).add('display', () => {
    return <About text={translations.en.messages} />
})
