import React, { Component } from 'react';
import axios from 'axios';
import AutoCompleteSearch from './AutoCompleteSearch';
import Map from './Map';

export default class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      airportACode: null,
      airportBCode: null
    };
  }

  // on submit, make a call to the api to get distance, put it on state
  handleSubmit = (e) => {
    e.preventDefault();
    const airportA = e.target.airportA.value;
    const airportB = e.target.airportB.value;
    axios.post('/api/airports/distance', {
      airportA: airportA,
      airportB: airportB
    })
      .then(res => {
        this.setState({
          airportACode: airportA,
          airportBCode: airportB,
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
        <Map airportA={this.state.airportACode} airportB={this.state.airportBCode}/>
      </div>
    );
  }
}
