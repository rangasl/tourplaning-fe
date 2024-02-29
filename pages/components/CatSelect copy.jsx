
'use client';
import React, { useState, useEffect } from 'react';

const CatSelect = () => {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/category/');
        const data = await response.json();
        setCategorys(data);
      } catch (error) {
        console.log(error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once after the initial render

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Select cats</h1>
      <select>
        {Array.isArray(categorys) &&
          categorys.map(category => (
            <option key={category.id} value={category.id}>
              {category.cat_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CatSelect;
