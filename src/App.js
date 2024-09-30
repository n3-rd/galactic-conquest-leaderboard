import React from 'react';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Galactic Warfare Leaderboard</h1>
      </header>
      <main>
        <Leaderboard />
      </main>
    </div>
  );
}

export default App;
