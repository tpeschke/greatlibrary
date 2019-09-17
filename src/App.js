import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div className="AppShell">
        <Routes />
        <div className="imageShell">
          <div className="image"></div>
        </div>
      </div>
    );
  }
}

export default App;
