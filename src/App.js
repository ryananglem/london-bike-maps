import React from 'react';
import './App.css';

const App = (props) =>
      <div className="App">
        <div className="App-header">
          <h2>London Bike Maps</h2>
        </div>
          { props.children }
      </div>
export default App
