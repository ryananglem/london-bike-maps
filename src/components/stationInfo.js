import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap'
import * as constants from '../config/constants'

const StationInfo = ({station, filter, text, displayColour, percentage}) => {
    return (
        <div>
            <div><strong>{ station.name }</strong></div>
            <span className="informational-text">{text.terminalName}: { station.terminalName } </span><br/>
            { (filter===constants.BIKES_AVAILABLE) ?
                <div>{text.bikesFree}: {station.bikes}</div>
                :
                <div>{text.spacesFree}: {station.spaces}</div>
            }
            <div>{text.totalSpaces}: {station.totalDocks}</div>
            <ProgressBar now={percentage} bsStyle={ displayColour } />
        </div>
    )
};
StationInfo.propTypes = {
    station: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
    text: PropTypes.object.isRequired,
    displayColour: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired
};
export default StationInfo;

