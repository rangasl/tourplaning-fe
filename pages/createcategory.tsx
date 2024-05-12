// CreateCategory.tsx

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import NavBar from './components/NavBar';
import { API_ENDPOINTS } from './constants';
import Sidebar from './components/Sidebar'; // Import Sidebar component

const CreateCategory: React.FC = () => {
  const router = useRouter();
  const [catName, setCatName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem('token');

      // Ensure all required fields are filled
      if (!catName) {
        console.error('Please fill in the category name');
        return;
      }

      const response = await axios.post(API_ENDPOINTS.CREATECATEGORIES, {
        cat_name: catName,
        description: description || null, // Optional description
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Category created successfully:', response.data);

      // Redirect to the home page or another appropriate page
      router.push('/');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const gotoDashboard = () => {
    router.push('/Dashboard');
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-grow">
        {/* Include the Sidebar component */}
        <Sidebar
          sections={[
            { label: 'Dashboard', route: '/Dashboard' },
            { label: 'Categories', route: '/categories' },
            { label: 'Create Place', route: '/createplaces' },
            { label: 'Create Category', route: '/createcategory' }
          ]} onFilterChange={function (query: string): void {
            throw new Error('Function not implemented.');
          } }        />
        <div className="flex items-center justify-center flex-grow w-3/4">
          <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
            <h1 className="text-center font-bold text-2xl mb-4">Create a New Category</h1>

            <label htmlFor="catName" className="block text-gray-700 font-bold mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="catName"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />

            <label htmlFor="description" className="block text-gray-700 font-bold mb-2 mt-4">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full h-24 resize-none"
            />

            <button
              onClick={handleCreateCategory}
              className="mt-6 bg-teal-500 w-full text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-green-300"
            >
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
