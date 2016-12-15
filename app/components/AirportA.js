import React, { Component } from 'react';

export default ({airports}) => (
  <div>
    <ul>
      {airports && airports.map((airport, idx) => (
        <li key={idx}>{airport.name}</li>
      ))}
    </ul>
  </div>
);
