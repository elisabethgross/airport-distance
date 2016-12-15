import React, { Component } from 'react';
import axios from 'axios';
import AirportA from '../components/AirportA';
// import AirportB from '../components/AirportB';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airports: []
    };
  }
  componentDidMount() {
    axios.get('/api/airports')
    .then(airports => this.setState({
      airports: airports.data
    }));
  }

  render () {
    return (
      <div>
        <AirportA airports={this.state.airports}/>
      </div>
    );
  }
}