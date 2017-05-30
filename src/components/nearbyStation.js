import React, {PropTypes} from 'react';
import PieChart from 'react-simple-pie-chart';

const NearbyStation = ({text, station, locale}) => {
    const bikes = (parseInt(station.bikes, 10) / parseInt(station.totalDocks, 10)) * 100
    const spaces = (parseInt(station.spaces, 10) / parseInt(station.totalDocks, 10)) * 100
    const bikeColour = '#C40239'
    const spacesColour = '#808080'
    return (
    <div>
        <strong>{station.name}</strong> <br/>
        <div>{ text.distance }: {station.distance.toFixed(2).toLocaleString(locale) } m </div>
        <div>
        <div className="pie-chart">
        <PieChart
            slices={[ { color: bikeColour, value: bikes },
                      { color: spacesColour, value: spaces } ] }/>
        </div>
        <div className="pie-chart-key">
            <div style={{ color: bikeColour }}>{text.bikes} : { bikes.toFixed(2).toLocaleString(locale) } %</div>
            <div style={{ color: spacesColour }}>{text.spaces}: {spaces.toFixed(2).toLocaleString(locale) } %</div>
        </div>
        </div>
    </div>
)}
NearbyStation.propTypes={
    text: PropTypes.object.isRequired,
    station: PropTypes.object.isRequired,
    locale: PropTypes.string
}
export default NearbyStation;