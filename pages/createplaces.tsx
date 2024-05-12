// CreatePlace.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Select from 'react-select';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import { API_ENDPOINTS } from './constants';

const CreatePlace: React.FC = () => {
  const router = useRouter();
  const [placeName, setPlaceName] = useState('');
  const [visitingCost, setVisitingCost] = useState('');
  const [visitingTime, setVisitingTime] = useState('');
  const [rating, setRating] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return; // Add return statement to exit early
      }
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
    const fetchFilteredPlaces = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_ENDPOINTS.PLACES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search: searchQuery,
          },
        });
        setFilteredPlaces(response.data);
      } catch (error) {
        console.error('Error fetching filtered places:', error);
      }
    };

    fetchFilteredPlaces();
  }, [searchQuery]);

  const handleCreatePlace = async () => {
    try {
      const token = localStorage.getItem('token');

      // Ensure all required fields are filled and parsed to the correct data types
      if (!placeName || !visitingCost || !visitingTime || !rating || !selectedCategory) {
        console.error('Please fill in all required fields');
        return;
      }

      const response = await axios.post(API_ENDPOINTS.PLACES, {
        place_name: placeName,
        visiting_cost: parseFloat(visitingCost), // Parse to float
        visiting_time: parseInt(visitingTime), // Parse to integer
        rating: parseFloat(rating), // Parse to float
        Category: selectedCategory.value, // Assuming your API expects the category ID
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Place created successfully:', response.data);

      // Redirect to the home page or another appropriate page
      router.push('/');
    } catch (error) {
      console.error('Error creating place:', error);
    }
  };

  const handleFilterChange = (query: string) => {
    setSearchQuery(query);
  };

  const gotoDashboard = () => {
    router.push('/Dashboard');
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-grow">
        <Sidebar
          sections={[
            { label: 'Dashboard', route: '/Dashboard' },
            { label: 'Categories', route: '/categories' },
            { label: 'Create Place', route: '/createplaces' },
            { label: 'Create Category', route: '/createcategory'}
          ]}
          onFilterChange={handleFilterChange}
        />
        <div className="flex items-center justify-center flex-grow w-3/4">
          <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
            <h1 className="text-center font-bold text-2xl mb-4">Create a New Place</h1>

            <label htmlFor="placeName" className="block text-gray-700 font-bold mb-2">
              Place Name
            </label>
            <input
              type="text"
              id="placeName"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />

            <label htmlFor="visitingCost" className="block text-gray-700 font-bold mb-2 mt-4">
              Visiting Cost
            </label>
            <input
              type="number"
              id="visitingCost"
              value={visitingCost}
              onChange={(e) => setVisitingCost(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />

            <label htmlFor="visitingTime" className="block text-gray-700 font-bold mb-2 mt-4">
              Visiting Time (in hours)
            </label>
            <input
              type="number"
              id="visitingTime"
              value={visitingTime}
              onChange={(e) => setVisitingTime(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />

            <label htmlFor="rating" className="block text-gray-700 font-bold mb-2 mt-4">
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />



            <label htmlFor="category" className="block text-gray-700 font-bold mb-2 mt-4">
              Category
            </label>
            <Select
              options={categories.map(category => ({ value: category.id, label: category.cat_name }))}
              onChange={value => setSelectedCategory(value)}
              value={selectedCategory}
            />

            <button
              onClick={handleCreatePlace}
              className="mt-6 bg-teal-500 w-full text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-green-300"
            >
              Create Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlace;
