import React, { useState } from 'react';
// import { Link, redirect } from "react-router-dom";
import '../App.css';
import { postNewUser } from '../services/API';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register: React.FC = () => {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
      ) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // You can perform registration logic here using the formData
        console.log('Registration form submitted:', formData);

        const response = await postNewUser(formData.username, formData.password);
        // Reset the form after successful registration
        if (response.exists){
          alert("Username already exists");
        } else {
          setFormData({
            username: '',
            password: '',
          });

          Cookies.set('jwt', response.jwt, { expires: 7 });
          Cookies.set('username', response.username, { expires: 7 });
          navigate('/');
          window.location.reload();
        }


      };
  return (
    <div className="page">
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Already have an account? Sign in
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Add an icon here if you want */}
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};
  
export default Register;
