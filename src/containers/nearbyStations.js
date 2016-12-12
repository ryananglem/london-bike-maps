import React, { Component } from 'react';

import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { getNearbyBikeStations } from '../actions/getNearestStations'

class NearbyStations extends Component {
    constructor(props){
        super(props);
    }
    componentDidUpdate(){
        if (!(this.props.coords.lat===this.props.searchResults.coords.lat &&
            this.props.coords.lng===this.props.searchResults.coords.lng)) {
            this.props.getNearbyStations(
                {lat: this.props.coords.lat, lng: this.props.coords.lng},
                500
            )
        }
    }
    render() {
        return (<div>
            <ul>
                nearby stations
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
                <li>item 4</li>
            </ul>
            { this.props.coords.lat }
        </div>)
    }
}
function mapStateToProps(state) {
    const { rootReducer } = state;
    const { mapReducer, filterReducer, nearbyStationReducer, searchReducer } = rootReducer;
    const { stations, isFetchingStations,  error } = nearbyStationReducer;
    const { coords } = mapReducer;
    const { filter } = filterReducer;
    const { searchResults } = searchReducer;
    return {
        isFetchingStations,
        stations,
        error,
        coords,
        filter,
        searchResults
    }
}
const mapDispatchToEvents = (dispatch) => {
    return {
        getNearbyStations: (coords, radius) => {
            dispatch(getNearbyBikeStations(coords, radius))
        }
    };
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(NearbyStations));