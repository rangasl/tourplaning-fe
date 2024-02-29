import React from 'react';

async function getPlaSelect() {
  const response = await fetch('http://127.0.0.1:8000/trip/');
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export default async function PlaSelect() {
  const places = await getPlaSelect();
  return (
    <div className="place-select-container">
      <h1 className="place-select-header">Select places</h1>
      <select className="place-select">
        {Array.isArray(places) &&
          places.map(place => (
            <option key={place.id} value={place.id}>
              {place.place_name}
            </option>
          ))}
      </select>
    </div>
  );
}
