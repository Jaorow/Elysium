import React from 'react';
import './App.css';

import VillageCards from './components/VillageCards';
import Header from './components/header';

function App() {


  return (

    <div className="App">

      <div className="navbar">
        <Header />
      </div>
      
      
      <VillageCards />

    </div>
  );
}

export default App;
