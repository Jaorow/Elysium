import React from "react";
import { Link } from "react-router-dom";
import '../App.css';


const Settings: React.FC = () => {
  return (
    <div className="page">
      <h1>Settings</h1>
      <Link to="/">Settings</Link>
    </div>
  );
};
  
export default Settings;