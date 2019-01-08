import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div className="AppShell">
        <div className="headerShell">
          <div className="headerImage"></div>
          <h2>A Spell and Miracle reference app for the <a href="http://highadventuregames.net">Bonfire Roleplaying Game</a></h2>
        </div>

        <Routes />
        <div className="imageShell">
          <div className="image"></div>
        </div>
      </div>
    );
  }
}

export default App;
