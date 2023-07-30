import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from './components/header';
import loginPopup from './components/loginPopup';
import VillageCards from './components/VillageCards';
import Register from './pages/register';


{/* <div className="App">

</div> */}

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check for a valid JWT when the app starts
    const jwt = Cookies.get('jwt');
    console.log(jwt);
    if (jwt == "test") {
      // Implement your logic to verify the JWT's validity on the server-side
      // If the JWT is valid, set the user as logged in
      handleLoginSuccess();
    }
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };


  return (
        <Router>
        <div className="navbar">
          <Header />
        </div>

        <Routes>
          <Route path="/" element={<VillageCards />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
  );
}


export default App;
