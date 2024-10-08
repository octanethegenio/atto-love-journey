import React, { useState } from 'react';

const PasswordProtection = ({ onCorrectPassword, children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Atto$200006') {
      setIsAuthenticated(true);
      onCorrectPassword();
    } else {
      alert('Incorrect password');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-100 to-pink-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-dancing-script text-red-600 mb-4 text-center">Welcome to Our Love Journey</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border p-2 mb-4 w-full rounded"
        />
        <button type="submit" className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600 transition duration-300">
          Enter
        </button>
      </form>
    </div>
  );
};

export default PasswordProtection;