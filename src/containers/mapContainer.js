import React, {Component} from 'react';
import Map from '../components/map'
import { connect } from 'react-redux'
import { withTranslate, IntlActions } from 'react-redux-multilingual'

class MapContainer  extends Component  {

    render()
    {
        const stations = [
            { id: 1, name:'North Greenwich', coords: { lat: 51.5, lng: 0 }},
            { id: 2, name:'King Edward Park', coords: { lat: 51.51, lng: -0.05 }}
            ];
        return (
            <div style={{ height: 600 + 'px', width: 800 + 'px'}}>
                <Map centre={{ lat: 51.53, lng: -0.1}} stations={ stations } loadingMessage={this.props.translate('loading')} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
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


