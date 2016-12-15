import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

// autosuggest methods
const suggestionsObj = {
  getSuggestions: (value, list) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : list.filter(airport =>
      // return if either name or IATA code matches an airport in list
      (airport.name.toLowerCase().slice(0, inputLength) === inputValue) || (airport.code.toLowerCase().slice(0, inputLength) === inputValue)
    );
  },
  getSuggestionValue: suggestion => suggestion.name,
  renderSuggestion: suggestion => (
    <div>
      {suggestion.name}
    </div>
  )
}

export default class AutoCompleteSearch extends Component {
    constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    }
  }

  componentDidMount() {
    // get the list of us airports
    axios.get('/api/airports')
      .then(airports => this.setState({
        airports: airports.data
      }));
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    if (this.state.airports) {
      this.setState({
        // pass the airports as the list to autosuggest from
        suggestions: suggestionsObj.getSuggestions(value, this.state.airports)
      });
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange
    };

    return (
      <div>
         <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestionsObj.getSuggestionValue}
          renderSuggestion={suggestionsObj.renderSuggestion}
          inputProps={inputProps}
          />
      </div>
    );
  }
}