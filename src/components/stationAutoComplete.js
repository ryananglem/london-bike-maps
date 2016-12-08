import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import renderSuggestion from './renderSuggestion';

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

class StationAutoComplete extends Component {

constructor() {
    super();
    this.state = {
        suggestions: []
    };
}

onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
        suggestions: this.props.getSuggestions(value)
    });
};

onSuggestionsClearRequested = () => {
    this.setState({
        suggestions: []
    });
};

render() {
    const { suggestions } = this.state;
    const inputProps = {
        placeholder: this.props.placeholder,
        value: this.props.searchText,
        onChange: this.props.onChange
    };
    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps} />
    );
    }
}
StationAutoComplete.propTypes = {
    getSuggestions: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};
export default StationAutoComplete;