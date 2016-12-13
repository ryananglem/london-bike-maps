import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { getNearbyBikeStations } from '../actions/getNearestStations';
import NearbyStation from '../components/nearbyStation';

class NearbyStations extends Component {

    componentDidMount(){
        this.props.getNearbyStations(
                {lat: this.props.coords.lat, lng: this.props.coords.lng},
                500
           )
    }
    componentWillUpdate(nextProps, nextState){
        if (nextProps.coords.lat!==nextProps.searchResults.coords.lat &&
           nextProps.coords.lng!==nextProps.searchResults.coords.lng) {

            this.props.getNearbyStations(
                {lat: nextProps.searchResults.coords.lat, lng: nextProps.searchResults.coords.lng},
                500
            )
        }
    }
    render() {
        if (this.props.stations===undefined) return null
        const translations = {
            distance: this.props.translate('distance'),
            bikes: this.props.translate('bikes'),
            spaces: this.props.translate('spaces')
        }
        return (<div><h4>{ this.props.translate('nearbyStations') }</h4>
            { this.props.stations.map((station) => {
                return (
                    <div key={station.id} >
                        <NearbyStation text={translations} station={ station } locale={this.props.locale} />
                    </div>)
            })
            }
            </div>)
    }
}
function mapStateToProps(state) {
    const { rootReducer, Intl } = state;
    const { mapReducer, filterReducer, nearbyStationReducer, searchReducer } = rootReducer;
    const { stations, isFetchingStations,  error } = nearbyStationReducer;
    const { locale }  = Intl;
    const { coords } = mapReducer;
    const { filter } = filterReducer;
    const { searchResults } = searchReducer;
    return {
        isFetchingStations,
        stations,
        error,
        coords,
        filter,
        searchResults,
        locale
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