import React, { Component } from 'react';
import axios from 'axios';
import AutoCompleteSearch from './AutoCompleteSearch';

export default class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      distance: 0
    };
  }

  // on submit, make a call to the api to get distance, put it on state
  handleSubmit = (e) => {
    e.preventDefault();
    const airportACode = e.target.airportA.value;
    const airportBCode = e.target.airportB.value;
    axios.post('/api/airports/distance', {
      airportA: airportACode,
      airportB: airportBCode
    })
      .then(res => {
        this.setState({
          distance: res.data
        })
      }
      );

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <AutoCompleteSearch name="airportA" placeholder={'Type airportA'} />
          <AutoCompleteSearch name="airportB" placeholder={'Type airportB'} />
          <input type="submit" />
        </form>
        <h1>{this.state.distance} miles</h1>
      </div>
    );
  }
}
