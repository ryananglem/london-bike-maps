import React, {PropTypes} from 'react';

const StationInfo = (props) => {
    return (
        <div>
            <strong>{ props.station.name }</strong><br />
        </div>
    )
}
StationInfo.propTypes = {
    station: PropTypes.object.isRequired
}
export default StationInfo;

