import React from 'react';
import './App.css';
import MapContainer from './containers/mapContainer'

const App = (props) =>
      <div className="App">
        <div className="App-header">
          <h2>London Bike Maps</h2>
        </div>
        <MapContainer />
      </div>

export default App
