import React, {Component} from 'react';
import Map from '../components/map'
import { connect } from 'react-redux'
import { withTranslate, IntlActions } from 'react-redux-multilingual'

class MapContainer  extends Component  {

    constructor(props){
        super(props);
        this.props.setLocale('en');
    }

    render()
    {

        const stations = [ { id: 1, coords: { lat: 51.5, lng: 0 }}, { id: 2, coords: { lat: 51.51, lng: -0.05 }} ];
        return (
            <div style={{ height: 600 + 'px', width: 800 + 'px'}}>
                <Map centre={{ lat: 51.53, lng: -0.1}} stations={ stations } loadingMessage={this.props.translate('loading')} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { multiLingualReducer } = state;
    return {
        multiLingualReducer
    }
}
const mapDispatchToEvents = (dispatch) => {
    return {
        setLocale: (locale) => {
            dispatch(IntlActions.setLocale(locale))
        }
    };
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(MapContainer));


