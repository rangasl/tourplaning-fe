// Place.tsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar'; // Import Sidebar component

const Place: React.FC = () => {
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

  const handleEdit = () => {
    router.push(`/EditPlace/${id}`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_ENDPOINTS.PLACES}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Redirect to some other page after deletion
      router.push('/');
    } catch (error) {
      console.error('Error deleting place:', error);
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
        <div className="bg-white shadow-md rounded-md p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Place Details</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">ID:</p>
              <p className="text-gray-800">{place.id}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Name:</p>
              <p className="text-gray-800">{place.place_name}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Visiting Cost:</p>
              <p className="text-gray-800">{place.visiting_cost}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Visiting Time:</p>
              <p className="text-gray-800">{place.visiting_time}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Rating:</p>
              <p className="text-gray-800">{place.rating}</p>
            </div>
          </div>
        </div>
        </main>
      </section>
    </div>
  );
};

export default Place;
