'use client';
import React from 'react'

const GetStart = () => {
  return (
    <div  class="flex justify-center pt-11">
      <button onClick={()=> console.log('get started')}
      className="mt-4 bg-teal-500 w-full text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300"> Get Started </button>
    </div>
  )
}

export default GetStart
