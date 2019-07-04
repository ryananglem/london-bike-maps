import * as React from 'react'
import { storiesOf } from '@storybook/react'
import StationInfo from './stationInfo'
import translations from '../translations'
import '../App.css'

import { ProgressBar } from 'react-bootstrap'

const station = {
    bikes: 10,
    spaces: 20,
    distance: 53.784502205714475,
    totalDocks: 30,
    name: 'Test dock',
    terminalName: '01234',
}
storiesOf('StationInfo', module)
    .add('bike available details', () => {
        return (
            <StationInfo
                text={translations.en.messages}
                station={station}
                percentage={30}
                displayColour="success"
                filter="BIKES_AVAILABLE"
            />
        )
    })
    .add('space available details', () => {
        return (
            <StationInfo
                text={translations.en.messages}
                station={station}
                percentage={30}
                displayColour="success"
                filter="SPACES_AVAILABLE"
            />
        )
    })
