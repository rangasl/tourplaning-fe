import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch token from localStorage after component mounts
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleLogout = () => {
    // Perform logout actions, e.g., remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    router.push('/login');
  };

  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white text-xl font-bold">Trip Planner</a></li>
          <li><a href="/about" className="text-white">About</a></li>
          <li><a href="/contact" className="text-white">Contact</a></li>
          {token && <li><a href="/createplaces" className="text-white">Create Place</a></li>}
          {token && <li><a href="/createcategory" className="text-white">Create Category</a></li>}
        </ul>
        <ul className="flex space-x-4">
          {token ? (
            <>
              <li><a href="/Dashboard" className="text-white">Dashboard</a></li>
              <li><button onClick={handleLogout} className="text-white cursor-pointer">Logout</button></li>
            </>
          ) : (
            <>
              <li><a href="/login" className="text-white">Login</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
