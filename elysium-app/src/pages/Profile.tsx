import React from "react";
import { Link } from "react-router-dom";
import '../App.css';


const Profile: React.FC = () => {
  return (
    <div className="page">

      <h1>Profile</h1>


      <Link to="/">Profile</Link>
    </div>
  );
};
  
export default Profile;