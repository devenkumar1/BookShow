'use client';
import React from 'react'
import { stateArray } from '@/utils/State.js'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function ShowsPage() {

  const [states, setStates] = useState(stateArray);
  const [cities, setCities] = useState([]);
  const [theatres,setTheatres]=useState([]);
  const[selectedState,setSelectedState]=useState([])
  const[selectedCity,setSelectedCity]=useState([]);

  const HandleChangeState = async (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    try {
      if (newState) {
        const response = await axios.get(`http://localhost:4000/auth/state/${newState}`);
        setCities(response.data.cities);
      }
    } catch (error) {
      console.log("something went wrong in fetching cities");
      toast.error("fetching city failed");
    }


  }

  const HandleCityChange = async(e)=>{
    const newCity = e.target.value;
    console.log(newCity);
    setSelectedCity(newCity);
    try {
      if(selectedCity){
        const response = await axios.get(`http://localhost:4000/auth/city/theatre/${selectedCity}`);
        console.log(response.data.theatres);
        setTheatres(response.data.theatres);
      }
    } catch (error) {
      console.log("error while fetching theatres",error);
      toast.error("loading theatres failed");
    }

  }

  const handleTheatreChange=async(e)=>{

    const selectedTheatre=e.target.value;
    try {
      if(selectedTheatre){
        const response= await axios.get("")
      }
    } catch (error) {
      
    }
  }
  

  return (
    <div className='min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white flex flex-col justify-center py-12'>
      <h1 className='text-4xl font-extrabold text-center text-white mb-8'>
        Choose a Show
      </h1>
      <div className='w-[90%] max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6'>
        <form className='flex flex-col gap-6'>
          <label htmlFor="state" className='text-lg font-semibold text-gray-700'>
            State:
            <select name="state" id="state" 
            className='mt-2 p-3 rounded-lg border border-gray-300'
             onChange={HandleChangeState}>

              <option value="">Select a State</option>
              {states.map((state) => {
                return <option key={state} value={state}>{state}</option>
              })

              }
            </select>
          </label>

          <label htmlFor="city" className='text-lg font-semibold text-gray-700'>
            City:
            <select name="city" id="city"
            onChange={HandleCityChange}
             className='mt-2 p-3 rounded-lg border border-gray-300'>
              <option value="">Select a City</option>
              {cities.map((city) => {
                return <option value={city.name} key={city._id}>{city.name}</option>
              })

              }
            </select>
          </label>

          <label htmlFor="theatre" className='text-lg font-semibold text-gray-700'>
            Theatre:
            <select name="theatre" id="theatre" className='mt-2 p-3 rounded-lg border border-gray-300'>
              <option value="">Select a Theatre</option>
              {theatres.map((theatre)=>{
                return <option value={theatre._id} key={theatre._id}>{theatre.name}</option>
              })

              }
            </select>
          </label>

          <label htmlFor="movie" className='text-lg font-semibold text-gray-700'>
            Movie:
            <select name="movie" id="movie" className='mt-2 p-3 rounded-lg border border-gray-300'>
              <option value="">Select a Movie</option>
              {/* Add movie options here */}
            </select>
          </label>

          <label htmlFor="show" className='text-lg font-semibold text-gray-700'>
            Show:
            <select name="show" id="show" className='mt-2 p-3 rounded-lg border border-gray-300'>
              <option value="">Select a Show</option>
              {/* Add show options here */}
            </select>
          </label>

          <label htmlFor="quantity" className='text-lg font-semibold text-gray-700'>
            Ticket Quantity:
            <input type="number" name="" id=""className='mt-2 p-3 rounded-lg border border-gray-300' />
          </label>

          <button
            type="submit"
            className='mt-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-bold shadow-md hover:shadow-xl transition duration-300'>
            Book Ticket
          </button>
        </form>
      </div>
    </div>
  )
}

export default ShowsPage
