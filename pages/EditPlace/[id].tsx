// EditPlace.tsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'; // Import NavBar component
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import { API_ENDPOINTS } from '../constants';

const EditPlace: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [place, setPlace] = useState<any>({});

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return; // Add return statement to exit early
    }

    const fetchPlace = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.PLACES}${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlace(response.data);
      } catch (error) {
        console.error('Error fetching place:', error);
      }
    };

    if (id) {
      fetchPlace();
    }
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlace({ ...place, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_ENDPOINTS.PLACES}${id}/`, place, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push(`/Place/${id}`);
    } catch (error) {
      console.error('Error updating place:', error);
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
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Place</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-gray-700">Place Name:</label>
                <input type="text" name="place_name" value={place.place_name || ''} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Visiting Cost:</label>
                <input type="number" name="visiting_cost" value={place.visiting_cost || ''} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Visiting Time:</label>
                <input type="number" name="visiting_time" value={place.visiting_time || ''} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Rating:</label>
                <input type="number" name="rating" value={place.rating || ''} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200" />
              </div>
              <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Update</button>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};

export default EditPlace;
