import React, {PropTypes} from 'react';

const StationInfo = (props) => {
    return (
        <div>
            <strong>{ props.station.name }</strong><br />
            terminal: { props.station.terminalName } <br/>

        </div>
    )
};
StationInfo.propTypes = {
    station: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired
};
export default StationInfo;

