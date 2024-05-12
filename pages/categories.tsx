// CategoryList.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import { API_ENDPOINTS } from './constants';

const CategoryList: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.CATEGORIES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category => {
      return category.cat_name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  const handleEditCategory = (categoryId: number) => {
    router.push(`/EditCategory/${categoryId}`);
  };

  const handleViewCategory = (categoryId: number) => {
    router.push(`/Category/${categoryId}`);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_ENDPOINTS.CATEGORIES}/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleGoToAddCategory = () => {
    router.push('/createcategory');
  };

  return (
    <div className="dashboard">
      <NavBar />
      <section className="content-wrapper flex flex-col sm:flex-row">
        {/* Include the Sidebar component with filter functionality */}
        <Sidebar
          sections={[
            { label: 'Dashboard', route: '/Dashboard' },
            { label: 'Categories', route: '/categories' },
            { label: 'Create Place', route: '/createplaces' },
            { label: 'Create Category', route: '/createcategory'}
          ]}
          onFilterChange={setSearchQuery}
        />
        <main className="main-content px-4 py-4 flex-grow sm:w-3/4">
          {filteredCategories.length > 0 ? (
            <ul className="category-list grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCategories.map((category: Category) => (
                <li key={category.id} className="category-card flex flex-col items-center p-4 bg-white rounded-md shadow-md">
                  <article className="flex-grow text-center"> 
                    <h2 className="text-lg font-medium">{category.cat_name}</h2>
                    <p className="text-gray-600">Description: {category.description}</p>
                  </article>
                  <div className="flex mt-4">
                    <button onClick={() => handleEditCategory(category.id)} className="text-cyan-600 mr-2">Edit</button>
                    <button onClick={() => handleViewCategory(category.id)} className="text-emerald-500 mr-2">View</button>
                    <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No categories found.</p>
          )}
        </main>
      </section>
    </div>
  );
};

export default CategoryList;
