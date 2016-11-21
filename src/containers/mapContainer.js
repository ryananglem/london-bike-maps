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
        }
        this.getAllBikeStations = this.props.getAllBikeStations;
    }

    componentDidMount()
    {
        //let _this = this;
        this.getAllBikeStations()//.then((tflStations) => {
            //console.log(tflStations);
        //});
    }

    render()
    {
        const stations = [
            { id: 1, name:'North Greenwich', coords: { lat: 51.5, lng: 0 }},
            { id: 2, name:'King Edward Park', coords: { lat: 51.51, lng: -0.05 }}
            ];

        return (
            <div style={{ height: 600 + 'px', width: 800 + 'px'}}>
                <Map centre={{lat: 51.51, lng: -0.05 }} stations={ stations } loadingMessage={this.props.translate('loading')} />
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


