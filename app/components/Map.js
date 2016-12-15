import { GoogleApiWrapper, Map } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';

let flightPlanCoordinates = [];

export class Container extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const A = nextProps.airportA
    const B = nextProps.airportB
    let aObj;
    let bObj;
    if (A && B) {
      axios.post('/api/airport', {
        name: A
      }).then(res => {
        aObj = res.data
      }).then(() => {
        return axios.post('/api/airport', {
          name: B
        })
      }).then(res => {
        bObj = res.data
      }).then(() => {
        flightPlanCoordinates.push({lat: aObj.lat, lng: aObj.lng}, {lat: bObj.lat, lng: bObj.lng})
      });
    }
  }

  fetchPlaces = (mapProps, map) => {
    const {google} = this.props;

    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);
  }

  render() {
    return (
      <Map google={this.props.google} onClick={this.fetchPlaces} zoom={4} center={{ lat: 39.833, lng: -98.583 }} />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyANYwfPtCwKAE5YoOumESeH5pAf8UXQ3WA'
})(Container);
