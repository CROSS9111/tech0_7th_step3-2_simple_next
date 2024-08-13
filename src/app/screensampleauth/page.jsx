// "use client";
// import React, { useState } from 'react';

// const Page = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleAuth = (path, realm) => {
//     if (!username || !password) {
//       setMessage('Please enter both username and password.');
//       return;
//     }

//     // username:password をBase64で符号化
//     const credentials = btoa(`${username}:${password}`);

//     console.log(`Encoded credentials: ${credentials}`);

//     fetch(`http://127.0.0.1:5000/api/${path}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Basic ${credentials}`
//       }
//     })
//     .then(response => {
//       if (response.status === 200) {
//         return response.json();
//       } else if (response.status === 401) {
//         setMessage(`Failed to authenticate for ${realm}.`);
//         return;
//       }
//     })
//     .then(data => {
//       if (data) {
//         setMessage(data.message);
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       setMessage('An error occurred.');
//     });
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Username
//         </label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Password
//         </label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//       <button
//         onClick={() => handleAuth('admin', 'Admin Area')}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
//       >
//         Authenticate as Admin
//       </button>
//       <button
//         onClick={() => handleAuth('user', 'User Area')}
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
//       >
//         Authenticate as User
//       </button>
//       <button
//         onClick={() => handleAuth('products', 'Products Area')}
//         className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
//       >
//         Access Products
//       </button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Page;




// "use client";
// import React, { useState } from 'react';

// const Page = () => {
//   const [message, setMessage] = useState('');
//   const handleAuth = async (path, realm) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/api/${path}`, {
//         method: 'GET',
//       });

//       if (response.status === 200) {
//         const data = await response.json();
//         setMessage(`Successfully authenticated. Received data: ${data.message}`);
//       } else if (response.status === 401) {
//         // 認証が必要な場合、ブラウザが自動的にポップアップを表示
//         setMessage(`Authentication required for ${realm}. Please enter credentials.`);
//       } else {
//         throw new Error('Unexpected response status');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('An error occurred.');
//     }
//   };


//   // const handleAuth = (path, realm) => {
//   //   fetch(`http://127.0.0.1:5000/api/${path}`, {
//   //     method: 'GET',
//   //   })
//   //   .then(response => {
//   //     if (response.status === 200) {
//   //       return response.json();
//   //     } else if (response.status === 401) {
//   //       // 認証が必要な場合、ブラウザが自動的にポップアップを表示
//   //       setMessage(`Authentication required for ${realm}. Please enter credentials.`);
//   //       return null;
//   //     }
//   //   })
//   //   .then(data => {
//   //     if (data) {
//   //       setMessage(`Successfully authenticated. Received data: ${data.message}`);
//   //     }
//   //   })
//   //   .catch(error => {
//   //     console.error('Error:', error);
//   //     setMessage('An error occurred.');
//   //   });
//   // };

//   return (
//     <div className="p-4">
//       <button
//         onClick={() => handleAuth('admin', 'Admin Area')}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
//       >
//         Access Admin
//       </button>
//       <button
//         onClick={() => handleAuth('user', 'User Area')}
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
//       >
//         Access User
//       </button>
//       <button
//         onClick={() => handleAuth('products', 'Products Area')}
//         className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
//       >
//         Access Products
//       </button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Page;




// ここから

"use client";
import React, { useState } from 'react';

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  const handleAuth = async (path, realm) => {
    setCurrentPath(path);
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/${path}`, {
        method: 'GET'
      });

      if (response.status === 200) {
        const data = await response.json();
        setMessage(`Access granted without authentication. Received data: ${data.message}`);
      } else if (response.status === 401) {
        // 認証が必要であればポップアップを表示
        setMessage(`Authentication required for ${realm}. Please enter credentials.`);
        setShowAuthPopup(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during the initial request.');
    }
  };

  const submitAuth = async () => {
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }
  
    const credentials = btoa(`${username}:${password}`);
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/${currentPath}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setMessage(`Successfully authenticated. Received data: ${data.message}`);
      } else if (response.status === 401) {
        setMessage(`Failed to authenticate for ${currentPath}.`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }finally {
      setShowAuthPopup(false);  // 認証成功・失敗に関わらずポップアップを閉じる
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => handleAuth('admin', 'Admin')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Access Admin
      </button>
      <button
        onClick={() => handleAuth('user', 'User')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Access User
      </button>
      <button
        onClick={() => handleAuth('products', 'Products')}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Access Products
      </button>

      {showAuthPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Authentication Required</h2>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={submitAuth}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <p>{message}</p>
    </div>
  );
};

export default Page;

