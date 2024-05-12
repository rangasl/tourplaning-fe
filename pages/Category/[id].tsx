// Category.tsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'; // Import NavBar component
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import { API_ENDPOINTS } from '../constants';

const Category: React.FC = () => {
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

  const handleEdit = () => {
    router.push(`/EditCategory/${id}`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_ENDPOINTS.CATEGORIES}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Redirect to some other page after deletion
      router.push('/categories');
    } catch (error) {
      console.error('Error deleting category:', error);
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
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Category Details</h1>
            <div className="bg-white shadow-md rounded-md p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 font-semibold">ID:</p>
                  <p className="text-gray-800">{category.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Name:</p>
                  <p className="text-gray-800">{category.cat_name}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Description:</p>
                  <p className="text-gray-800">{category.description}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Category;
