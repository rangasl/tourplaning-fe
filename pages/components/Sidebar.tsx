// Sidebar.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface SidebarProps {
  sections: { label: string; route: string }[];
  onFilterChange: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, onFilterChange }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const goToRoute = (route: string) => {
    router.push(route);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    onFilterChange(value);
  };

  return (
    <aside className="sidebar bg-gray-800 text-white px-4 py-4 w-1/4 md:w-1/4 sticky top-0 left-0 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Management</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleFilterChange}
        className="mt-2 p-2 border rounded-md w-full text-black"
      />
      <ul className="list-none space-y-2 mt-7">
        {sections.map((section, index) => (
          <li key={index}>
            <button onClick={() => goToRoute(section.route)} className="btn btn-primary">
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
