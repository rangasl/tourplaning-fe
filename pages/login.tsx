import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/token/', {
            username,
            password,
        });

        const accessToken = response.data.access;
        console.log('Access Token:', accessToken);
        // Store the token in localStorage or a state management solution
        localStorage.setItem('token', accessToken);

        // Redirect to the home page
        router.push('/');

      // Use the access token as needed
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />

        <label className="block text-sm font-medium text-gray-600 mb-2 mt-4">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />

        <button
          onClick={handleLogin}
          className="mt-4 bg-teal-500 w-full text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
