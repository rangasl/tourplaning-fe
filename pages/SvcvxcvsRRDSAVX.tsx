import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
      });
  
      // You can handle the response as needed
      console.log('Registration successful:', response.data);
  
      // Redirect to the login page or another appropriate page
      router.push('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center mb-4 text-teal-600 ">Register</h1>


        <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />

        <label className="block text-sm font-medium text-gray-600 mb-2 mt-4">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleRegister}
          className="mt-4 bg-teal-500 w-full text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Register
        </button>

        <div className="text-center mt-4">
          Already have an account? <a href="/login" className="text-teal-600 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
