import Homecard from './components/Homecard'
import Example from './components/Example'
import NavBar from './components/NavBar'
import Form from './components/Form'
import MapResalt from './components/MapResalt'
import SelectedTrip from './components/SelectedTrip'
import Link from 'next/link';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <main>
      
      <NavBar />
      <div className="flex flex-row">
        <div className="basis-1/4 md:basis-1/5"></div>
        <div className="basis-1/4 md:basis-3/5">
          <Homecard />
          
          <div  className="flex justify-center pt-11">
            <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300"> 
              Get Started 
            </button>
          </div>
          
          <Form />
          </div>
        <div className="basis-1/2 md:basis-1/5"></div>
      </div>
      {/*  <MapResalt />  */}
      {/*  <SelectedTrip />  */}
    </main>
  )
}
