import React from 'react';
import './App.css';
import { getVillages } from './services/API';

function App() {
  return (
    <div className="App">
      help
      <button onClick={getVillages}>Click me</button>
    </div>
  );
}

export default App;
