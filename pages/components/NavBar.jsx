import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white text-xl font-bold">Trip Planner</a></li>
          <li><a href="/about" className="text-white">About</a></li>
          <li><a href="/contact" className="text-white">Contact</a></li>
        </ul>
        <ul className="flex space-x-4">
          <li><a href="/register" className="text-white">Register</a></li>
          <li><a href="/login" className="text-white">Login</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
