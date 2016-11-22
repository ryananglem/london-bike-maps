import React, {Component} from 'react';
import Map from '../components/map'
import { connect } from 'react-redux'
import { withTranslate, IntlActions } from 'react-redux-multilingual'
import {getAllBikeStations} from '../api/bikeHireApi';

class MapContainer  extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingStations: false,
            error: '',
            stations: []
        };
        this.getAllBikeStations = this.props.getAllBikeStations;
    }
    componentDidMount()
    {
        this.getAllBikeStations();
    }
    render()
    {
        if (this.props.stations===undefined) return null;
        return (
            <div style={{ height: 600 + 'px', width: 800 + 'px'}}>
                <Map centre={{lat: 51.506451, lng: -0.170279 }} stations={ this.props.stations } loadingMessage={this.props.translate('loading')} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { rootReducer } = state;
    const { bikeStationReducer } = rootReducer;
    const { isFetchingStations, stations, error } = bikeStationReducer;
    return {
        isFetchingStations,
        stations,
        error
    }
}
const mapDispatchToEvents = (dispatch) => {
    return {
        getAllBikeStations: () => {
            dispatch(getAllBikeStations())
        },
        setLocale: (locale) => {
            dispatch(IntlActions.setLocale(locale))
        }
    };
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(MapContainer));


