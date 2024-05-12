// Dashboard.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import { API_ENDPOINTS } from './constants';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchPlaces = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.PLACES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, []);

  useEffect(() => {
    const filtered = places.filter(place => {
      return place.place_name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredPlaces(filtered);
  }, [searchQuery, places]);

  const handleEditPlace = (placeId: number) => {
    router.push(`/EditPlace/${placeId}`);
  };

  const handleViewPlace = (placeId: number) => {
    router.push(`/Place/${placeId}`);
  };

  const handleDeletePlace = async (placeId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_ENDPOINTS.PLACES}/${placeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== placeId));
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  const handlegotoaddplace = () => {
    router.push('/createplaces');
  }

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
          {filteredPlaces.length > 0 ? (
            <ul className="place-list grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPlaces.map((place: Place) => (
                <li key={place.id} className="place-card flex flex-col items-center p-4 bg-white rounded-md shadow-md">
                  <article className="flex-grow text-center"> 
                    <h2 className="text-lg font-medium">{place.place_name}</h2>
                    <p className="text-gray-600">Rating: {place.rating}</p>
                  </article>
                  <div className="flex mt-4">
                    <button onClick={() => handleEditPlace(place.id)} className="text-cyan-600 mr-2">Edit</button>
                    <button onClick={() => handleViewPlace(place.id)} className="text-emerald-500 mr-2">View</button>
                    <button onClick={() => handleDeletePlace(place.id)} className="text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No places found.</p>
          )}
        </main>
      </section>
    </div>
  );
};

export default Dashboard;
