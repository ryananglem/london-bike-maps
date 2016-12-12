import React, {PropTypes} from 'react';

const NearbyStation = (props) => (
    <div>
        <strong>{props.station.name}</strong> <br/>
        <div>{ props.text.distance }: {props.station.distance.toFixed(2).toLocaleString(props.locale) } </div>
        <div></div>

    </div>
)
NearbyStation.propTypes={
    text: PropTypes.object.isRequired
}
export default NearbyStation;