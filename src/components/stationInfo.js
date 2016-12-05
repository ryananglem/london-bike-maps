import React, {PropTypes} from 'react';
import { ProgressBar } from 'react-bootstrap';

const StationInfo = (props) => {
    return (
        <div>
            <div><strong>{ props.station.name }</strong></div>
            <span className="informational-text">{props.text.terminalName}: { props.station.terminalName } </span><br/>
            { (props.filter==="BIKES_AVAILABLE") ?
                <div>{props.text.bikesFree}: {props.station.bikes}</div>
                :
                <div>{props.text.spacesFree}: {props.station.spaces}</div>
            }
            <div>{props.text.totalSpaces}: {props.station.totalDocks}</div>
            <ProgressBar now={props.percentage} bsStyle={ props.displayColour } />
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

