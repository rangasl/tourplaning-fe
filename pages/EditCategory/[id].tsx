// EditCategory.tsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'; // Import NavBar component
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import { API_ENDPOINTS } from '../constants';

const EditCategory: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState<any>({});

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return; // Add return statement to exit early
    }

    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.CATEGORIES}${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_ENDPOINTS.CATEGORIES}${id}/`, category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push(`/Category/${id}`);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="dashboard"> {/* Apply similar styles to match Dashboard */}
      <NavBar /> {/* Render NavBar component */}
      <section className="content-wrapper flex flex-col sm:flex-row">
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
        <main className="main-content px-4 py-4 flex-grow sm:w-3/4">
          <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-md p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Category</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="cat_name" className="block text-gray-700">Category Name:</label>
                <input type="text" id="cat_name" name="cat_name" value={category.cat_name || ''} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description:</label>
                <input type="text" id="description" name="description" value={category.description || ''} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" />
              </div>
              <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Update</button>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};

export default EditCategory;
