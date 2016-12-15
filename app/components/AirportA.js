import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

// let theAirports = [];

// axios.get('/api/airports')
//   .then(airports => {
//     console.log('did it')
//     theAirports = airports.data;
//   });

const suggestionsObj = {
  getSuggestions: (value, list) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : list.filter(airport =>
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

export default class AirportA extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    }
  }

  componentDidMount() {
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

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Type an airport',
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
