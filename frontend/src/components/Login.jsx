import React, { useState } from 'react';
import axios from 'axios';
function Login(){
    // State to hold form values
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validate input
        if (!userName || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/users/register-login', {
                userName,
                password,
            });

            // Assuming the response contains a token or user data
            const { token } = response.data;
            // Store token in local storage (or cookies)
            localStorage.setItem('token', token);

            // Redirect to a protected route or dashboard
            window.location.href = '/profile';

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Invalid credentials.');
            } 
        }
    };
    return(
        
<form id="personal-info-form" onSubmit={handleSubmit}>

    <div className="border-b border-gray-900/10 pb-12">
      <h1 className="text-base/7 font-semibold text-white-900">Login to your account</h1>
      <p className="mt-1 text-sm/6 text-gray-100">New here? <a href="/register2" >Register here</a></p>
      {error && <div className="text-red-600">{error}</div>} {/* Error message */}
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">

      <div className="sm:col-span-3">
            <label htmlFor="user-name" className="block text-sm/6 font-medium text-white-900">User name</label>
            <div className="mt-2">
              <input 
                id="user-name" 
                name="user-name" 
                type="text" 
                autoComplete="user-name" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)} 
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

        
          <div className="sm:col-span-3">
            <label htmlFor="password" className="block text-sm/6 font-medium text-white-900">Password</label>
            <div className="mt-2">
              <input 
                type="password" 
                name="password" 
                id="password" 
                autoComplete="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
              />
            </div>
          </div>
          </div>

        

        
    </div>

    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base/7 font-semibold text-white-900">Notifications</h2>
      <p class="mt-1 text-sm/6 text-white-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

  </div>

  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
  </div>
</form>

    );
}
export default Login;