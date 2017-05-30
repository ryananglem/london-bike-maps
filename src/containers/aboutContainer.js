import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import About from '../components/about'

class AboutContainer extends Component  {
    render() {
        const translatedText = {
            appName: this.props.translate('appName'),
            thisProjectUses: this.props.translate('thisProjectUses'),
            projectApiDescription: this.props.translate('projectApiDescription'),
            thisProjectReason: this.props.translate('thisProjectReason'),
            writtenBy: this.props.translate('writtenBy'),
            technology: this.props.translate('technology')
        };
        return (
            <About text={ translatedText } />
        );
    }
}
const mapStateToProps = state => {
    const { Intl } = state;
    const { locale }  = Intl;
    return {
        locale
    }
}
const mapDispatchToEvents = dispatch => {
    return {

    };
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(AboutContainer));


