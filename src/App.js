import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Great Library</h1>
          <h2>A Spell and Miracle reference app for the <a href="http://highadventuregames.net">Bonfire Roleplaying Game</a></h2>
        </div>

        <Routes />
      </div>
    );
  }
}

export default App;
