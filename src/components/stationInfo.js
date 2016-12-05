import React, {PropTypes} from 'react';
import { ProgressBar } from 'react-bootstrap';

const StationInfo = (props) => {
    ///todo: move this logic up to the container
    const percentage = (props.filter==="BIKES_AVAILABLE")
                    ? (parseInt(props.station.bikes, 10) / parseInt(props.station.totalDocks, 10)) * 100
                    : (parseInt(props.station.spaces, 10) / parseInt(props.station.totalDocks, 10)) * 100;
    const colour = (percentage < 10.0) ? 'danger' : (percentage < 20.0) ? 'warning' : 'success';
    return (
        <div>
            <div><strong>{ props.station.name }</strong></div>
            <span className="informational-text">{props.text.terminalName}: { props.station.terminalName } </span><br/>
            <div>{props.text.bikesFree}: {props.station.bikes}</div>
            <div>{props.text.spacesFree}: {props.station.spaces}</div>
            <div>{props.text.totalSpaces}: {props.station.totalDocks}</div>
            <ProgressBar now={percentage} bsStyle={ colour } />
        </div>
    )
};
StationInfo.propTypes = {
    station: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
    text: PropTypes.object.isRequired
};
export default StationInfo;

