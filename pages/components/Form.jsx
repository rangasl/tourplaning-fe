'use client'
// Importing necessary modules and components
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import ReactStars from 'react-rating-stars-component';
import { API_ENDPOINTS } from '../constants';




// Define the Form component
const Form = () => {
  const [mapCenter, setMapCenter] = useState([7.8583504, 79.3868575]); 
  const [mapZoom, setMapZoom] = useState(7);
  const [satisfactionLevel, setSatisfactionLevel] = useState(null);

  
  // State variables to store places, categories, form data, and trip response
  const [places, setPlaces] = useState([]);
  const [selectedPlacesForDropdown, setSelectedPlacesForDropdown] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]); // New state for route coordinates
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    budget: '',
    time: '',
    places: [],
    categories: [],
  });
  const [tripResponse, setTripResponse] = useState(null);

  // Function to fetch places from the server
  const fetchPlaces = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.PLACES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  // Function to fetch categories from the server
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.CATEGORIES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // useEffect to fetch places and categories on component mount
  useEffect(() => {
      fetchPlaces();
      fetchCategories();
    // If there is a trip response, update the route coordinates
    if (tripResponse && tripResponse.trip_details) {
      const newRouteCoordinates = tripResponse.trip_details
        .filter((trip) => trip.waypoint_lat && trip.waypoint_lng)
        .map((trip) => [trip.waypoint_lat, trip.waypoint_lng]);

      setRouteCoordinates(newRouteCoordinates);
    }
  }, [tripResponse]);

  // Event handler for form input changes
  const handleChange = (e) => {
    if (e.target.name === 'categories') {
      const categoryId = e.target.value;

      // Check if the selected category is not null or undefined
      if (categoryId !== null && categoryId !== undefined) {
        const updatedCategories = formData.categories.includes(categoryId)
          ? formData.categories.filter((cat) => cat !== categoryId)
          : [...formData.categories, categoryId];
        setFormData({ ...formData, categories: updatedCategories });
        console.log(updatedCategories);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handlePlacesSelectChange = (selectedOptions) => {
    // Filter out null values from selectedOptions
    const nonNullSelectedOptions = selectedOptions.filter((option) => option.value !== null);
  
    setSelectedPlacesForDropdown(nonNullSelectedOptions);
  
    // Update formData with selected place IDs, filtering out null values
    setFormData({
      ...formData,
      places: nonNullSelectedOptions.map((option) => option.value),
    });
  };

  // New state for loading and loading progress
  const [loading, setLoading] = useState(false); 
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [error, setError] = useState(null); // New state for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Set loading to true when starting the request
    setLoading(true);
  
    // Reset loading progress on each new request
    setLoadingProgress(0);
  
    console.log('Form Data:', formData); // Debug log
  
    // Validation: Check if any of the required fields are null or undefined
    if (
      formData.budget === '' ||
      formData.time === '' ||
      formData.places.includes(null) ||
      formData.categories.includes(null)
    ) {
      console.error('Please fill in all required fields');
      //set error
      setError('Please fill in all required fields');
      setLoading(false); // Set loading to false on validation error
      return;
    }
  
    try {
      // Simulate loading progress
      const timeoutDuration = 10000; // loading bar timeout duration in milliseconds
      const interval = setInterval(() => {
        setLoadingProgress((prevProgress) => prevProgress + (100 / (timeoutDuration / 60)));
      }, 100);
  
      const token = localStorage.getItem('token'); // Declare 'token' here
      const response = await fetch('http://127.0.0.1:8000/trip_recomendation/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          budget: parseInt(formData.budget),
          time: parseInt(formData.time),
          places: formData.places,
          categories: formData.categories.filter((category) => category !== null).map(Number),
        }),
      });
  
      const data = await response.json();
      clearInterval(interval); // Clear the interval when the request is complete
  
      console.log('Response:', data);
      setTripResponse(data); // Set the response in state
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  


  const startingPlace = {
    address: "Bandaranaike International Airport (CMB), Katunayake, Sri Lanka",
    lat: 7.168310399999998,
    lng: 79.8829646,
  };

  const initialMapCenter = startingPlace
  ? [startingPlace.lat, startingPlace.lng]
  : [7.8583504, 79.3868575];
  
  // Return the JSX for the Form component
  return (
    <div className="grid gap-4 items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-center font-bold text-2xl">Plan Your Trip Now!</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="col-span-1">
            <label htmlFor="budget" className="block text-gray-700 font-bold mb-2">
              Budget
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              placeholder="Enter your budget"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={formData.budget}
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
              Days
            </label>
            <input
              type="number"
              id="time"
              name="time"
              placeholder="Enter number of days"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={formData.time}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
          <div className="place-select-container">
            <h1 className="place-select-header">Select places</h1>
            <Select
              isMulti
              options={Array.isArray(places) ? places.map(place => ({ value: place.id, label: place.place_name })) : []}
              onChange={handlePlacesSelectChange}
              value={selectedPlacesForDropdown}
            />
          </div>

          <div className="place-select-container">
            <h1 className="place-select-header">Select categories</h1>
            <div className="flex flex-wrap -mx-2">
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    name="categories"
                    className={`px-4 py-2 mx-2 my-2 text-white rounded-full focus:outline-none bg-gradient-to-r bg-black hover:bg-gray-500 transform ${
                      formData.categories.includes(String(category.id)) ? 'bg-teal-600 text-blue-200' : ''
                    }`}
                    value={category.id}
                    onClick={handleChange}
                  >
                    {formData.categories.includes(String(category.id)) && <span className="mr-2 "></span>}
                    {category.cat_name}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4 mb-10">
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Generating' : 'Generate Your Trip'}
          </button>
        </div>

        {loading && (
          <div className="mt-2">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase text-teal-600">
                    Loading
                  </span>
                </div>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-teal-200">
                <div
                  style={{ width: `${loadingProgress}%` }}
                  className="flex flex-col h-full w-full bg-teal-500 shadow-none"
                ></div>
              </div>
            </div>
          </div>
        )}

        {tripResponse && tripResponse.selected_trips && tripResponse.selected_trips.length > 0 ? (
          <>
            <div className="p-10 border-2 border-teal-500 rounded-lg">
              <div className="flex flex-col items-center space-y-5 p-10">
                <div className="relative">
                  <p> Bandaranaike International Airport (CMB)</p>
                </div>
                {tripResponse.trip_details.map((trip, index) => (
                
                  <div key={trip.index} className="relative">
                      {<div className="absolute left-1/2 pb-6 transform -translate-x-1/2 h-6 w-1 bg-teal-500"></div>}
                      <p className='mt-5 pt-1'>{trip.end_address.split(',')[0]}</p>
                  </div>
                ))}
              </div>
            </div>

            {tripResponse && tripResponse.traveling_distance !== undefined && (
              <div className="flex flex-col items-center space-y-5 p-10">
                <h2 className="text-xl font-semibold">Total Traveling Distance :</h2>
                <p>{tripResponse.traveling_distance.toFixed(2)} km</p>
              </div>
            )}
            {tripResponse && tripResponse.traveling_time !== undefined && (
            <div className="flex flex-col items-center space-y-5 p-4">
              <h2 className="text-xl font-semibold">Total Time on the Road :</h2>
              <p>{tripResponse.traveling_time.toFixed(2)} hours</p>
            </div>
            )}
            <div className="flex flex-col items-center space-y-5 p-4">
              <h2 className="text-xl font-semibold">Total Cost :</h2>
              <p>#### LKR</p>
            </div>
            <div className="flex flex-col items-center space-y-5 p-4">
              <h1>Satisfaction:
                <ReactStars
                  count={5}
                  size={24}
                  edit={false}
                  value={tripResponse.satifaction}
                  activeColor="#0D9488"
                />
              </h1>
            </div>
            <div className="map-container">
              <iframe
                title="Google Maps"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBUf7bBjKqTTf4jt8swHjtaGEzzzNo8Few&origin=${startingPlace.lat},${startingPlace.lng}&destination=${tripResponse.trip_details[0].end_lat},${tripResponse.trip_details[0].end_lng}&waypoints=${tripResponse.trip_details.slice(1).map(trip => `${trip.end_lat},${trip.end_lng}`).join('|')}`}
                allowFullScreen
              ></iframe>
            </div>
          </>
        ) : (
          <>
            {tripResponse && tripResponse.selected_trips && tripResponse.selected_trips.length === 0 && (
              <p className="text-red-500 text-xs italic">
                Your budget or time is insufficient. Please adjust your criteria.
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
