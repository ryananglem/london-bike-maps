import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import renderSuggestion from './renderSuggestion'

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name

class StationAutoComplete extends Component {
    constructor() {
        super()
        this.state = {
            suggestions: [],
        }
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.props.getSuggestions(value),
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        })
    }

    render() {
        const { suggestions } = this.state
        const {
            searchText,
            onChange,
            placeholder,
            setSelectedValue,
        } = this.props
        const inputProps = {
            placeholder: placeholder,
            value: searchText,
            onChange: onChange,
        }
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={(_, { suggestion }) =>
                    setSelectedValue(suggestion)
                }
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        )
    }
}
StationAutoComplete.propTypes = {
    getSuggestions: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    setSelectedValue: PropTypes.func.isRequired,
}
export default StationAutoComplete
