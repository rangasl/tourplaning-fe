import React from "react";

import CatSelect from "./CatSelect";
import PlaSelect from "./PlaSelect";

const Form = async () => {
  return (
    <div className="grid sm:gap-4 items-center h-screen">
      <form className="bg-white rounded-lg shadow-md p-8">
        
        <h1 className="text-center font-bold text-2xl">Plan Your Trip Now !</h1>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
          <PlaSelect />
          <CatSelect />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="col-span-1">
            <label htmlFor="budget" className="block text-gray-700 font-bold mb-2">
              Budget
            </label>
            <input
              type="number"
              id="budget"
              placeholder="Enter your budget"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="days" className="block text-gray-700 font-bold mb-2">
              Days
            </label>
            <input
              type="number"
              id="days"
              placeholder="Enter number of days"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
            Generate Your Trip
          </button> 
        </div>
      </form>
    </div>
  );
};

export default Form;
