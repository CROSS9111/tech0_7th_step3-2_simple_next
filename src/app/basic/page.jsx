"use client";
import React, { useState } from 'react';

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = (path, realm) => {
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }

    // username:password をBase64で符号化
    const credentials = btoa(`${username}:${password}`);

    console.log(`Encoded credentials: ${credentials}`);

    fetch(`http://127.0.0.1:5000/api/${path}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        setMessage(`Failed to authenticate for ${realm}.`);
        return;
      }
    })
    .then(data => {
      if (data) {
        setMessage(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage('An error occurred.');
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={() => handleAuth('admin', 'Admin Area')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Authenticate as Admin
      </button>
      <button
        onClick={() => handleAuth('user', 'User Area')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Authenticate as User
      </button>
      <button
        onClick={() => handleAuth('products', 'Products Area')}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Access Products
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Page;
