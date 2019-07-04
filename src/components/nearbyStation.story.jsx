import * as React from 'react'
import { storiesOf } from '@storybook/react'
import NearbyStation from './nearbyStation'
import translations from '../translations'
import '../App.css'

storiesOf('NearbyStations', module).add('dock details', () => {
    const station = {
        bikes: 10,
        spaces: 20,
        distance: 53.784502205714475,
        totalDocks: 30,
        name: 'Test dock',
    }
    return (
        <NearbyStation
            text={translations.en.messages}
            station={station}
            locale={'en'}
        />
    )
})
