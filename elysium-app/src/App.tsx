import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from './components/navBar';
import Compare from "./pages/Compare";
import VillageCards from './components/VillageCards';
import Register from './pages/Register';
import Help from './pages/Help';
import Settings from './pages/Settings';
import Profile from './pages/Profile';


const App: React.FC = () => {

	return (
				<Router>
				<div className="navbar">
					<Header />
				</div>

				<Routes>
					<Route path="/" element={<VillageCards />} />
					<Route path="/Register" element={<Register />} />
					<Route path="/Compare" element={<Compare />} />
					<Route path="/Help" element={<Help />} />
					<Route path="/Profile" element={<Profile />} />
					<Route path="/Settings" element={<Settings />} />
				</Routes>
			</Router>
	);
}


export default App;
