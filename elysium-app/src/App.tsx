import React from 'react';
import './App.css';

import VillageCards from './VillageCards';
import Header from './header';

function App() {


  return (

    <div className="App">

      <div className="navbar">
        <Header />
      </div>
      
      {/* <h1 className =" text-3xl underline "> Welcome to elysium </h1> */}
      
      <VillageCards />

    </div>
  );
}

export default App;
