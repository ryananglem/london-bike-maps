import React, {PropTypes} from 'react';
import PieChart from 'react-simple-pie-chart';

const NearbyStation = (props) => {
    const bikes = (parseInt(props.station.bikes, 10) / parseInt(props.station.totalDocks, 10)) * 100
    const spaces = (parseInt(props.station.spaces, 10) / parseInt(props.station.totalDocks, 10)) * 100
    const bikeColour = '#C40239'
    const spacesColour = '#808080'
    return (
    <div>
        <strong>{props.station.name}</strong> <br/>
        <div>{ props.text.distance }: {props.station.distance.toFixed(2).toLocaleString(props.locale) } m </div>
        <div>
        <div className="pie-chart">
        <PieChart
            slices={[ { color: bikeColour, value: bikes },
                      { color: spacesColour, value: spaces } ] }/>
        </div>
        <div className="pie-chart-key">
            <div style={{ color: bikeColour }}>{props.text.bikes} : { bikes.toFixed(2).toLocaleString(props.locale) } %</div>
            <div style={{ color: spacesColour }}>{props.text.spaces}: {spaces.toFixed(2).toLocaleString(props.locale) } %</div>
        </div>
        </div>
    </div>
)}
NearbyStation.propTypes={
    text: PropTypes.object.isRequired,
    station: PropTypes.object.isRequired
}
export default NearbyStation;