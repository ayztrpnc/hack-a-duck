import React, { useState } from 'react';

function Register2() {
  // State to hold form values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');




  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

      //validate names
      if (firstName.length<3){
        alert("Please enter a valid first name")
        return;
      }
      if (lastName.length<3){
        alert("Please enter a valid last name")
        return;
      }
      if (userName.length<3){
        alert("user name must be 3 characters or more !")
        return;
      }

    // Validate email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }


    // Validate password and confirm password match
    if (password.length<4){
        alert("Please use a strong password! (8 or more characters)!")
        return;
    }
    if (password.length>=4){
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        // Check if all conditions are met
        if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
            alert("Please use a strong password! It should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
            return;
        }
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    
    alert("Registration successful!");
  };

  return (
    <form id="personal-info-form" onSubmit={handleSubmit}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-white-900">Personal Information2</h2>
        <p className="mt-1 text-sm/6 text-gray-100">Use a permanent address where you can receive mail.</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm/6 font-medium text-white-900">First name</label>
            <div className="mt-2">
              <input 
                type="text" 
                name="first-name" 
                id="first-name" 
                autoComplete="given-name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} 
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm/6 font-medium text-white-900">Last name</label>
            <div className="mt-2">
              <input 
                type="text" 
                name="last-name" 
                id="last-name" 
                autoComplete="family-name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

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
            <label htmlFor="email" className="block text-sm/6 font-medium text-white-900">Email address</label>
            <div className="mt-2">
              <input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
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

          <div className="sm:col-span-3">
            <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-white-900">Confirm Password</label>
            <div className="mt-2">
              <input 
                type="password" 
                name="confirm-password" 
                id="confirm-password" 
                autoComplete="confirm-password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-white-900">Notifications</h2>
        <p className="mt-1 text-sm/6 text-white-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">Cancel</button>
        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  );
}

export default Register2;
