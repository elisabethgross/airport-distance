import React, { Component } from 'react';
import AutoCompleteSearch from './AutoCompleteSearch';

export default class AppContainer extends Component {

  render() {

    return (
      <div>
        <AutoCompleteSearch placeholder={'Type airportA'} />
        <AutoCompleteSearch placeholder={'Type airportB'} />
      </div>
    );
  }
}