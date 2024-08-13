"use client"
import { useState } from 'react';

export default function BasicAuthPage() {
  const [path, setPath] = useState('');
  const [realm, setRealm] = useState('');
  const [result, setResult] = useState('');

  // server側で認証を実施する関数。セッション中（ブラウザ側が再接続されるまでは持続される）
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/basicauth?path=${encodeURIComponent(path)}&realm=${encodeURIComponent(realm)}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.message);
      } else {
        setResult(`Authorization failed: ${response.statusText}`);
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 className="text-2xl font-bold mb-4">Basic Authentication</h1>
    <ul className="mb-6">
      <li className="mb-2">
        <span className="font-semibold">path:</span> admin <span className="font-semibold">realm:</span> Admin
      </li>
    </ul>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Path:
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Realm:
          <input
            type="text"
            value={realm}
            onChange={(e) => setRealm(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Authenticate
      </button>
    </form>
    {result && <p className="mt-4 text-green-500 font-medium">{result}</p>}
  </div>

  );
}
