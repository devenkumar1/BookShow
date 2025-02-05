'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { stateArray } from '@/utils/State';
import { getUserData } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function ShowsPage() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [states, setStates] = useState(stateArray); // Your states array
  const [cities, setCities] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [movies, setMovies] = useState([]); // List of available movies
  const [shows, setShows] = useState([]); // List of available shows for selected movie and theatre
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShow, setSelectedShow] = useState(null); // For selected show details
  const [quantity, setQuantity] = useState(1); // Ticket quantity
  const [totalPrice, setTotalPrice] = useState(0); // Calculated total price

  // Fetch cities based on state
  const handleStateChange = async (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    try {
      if (newState) {
        const response = await axios.get(`http://localhost:4000/auth/state/${newState}`);
        setCities(response.data.cities);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Failed to fetch cities');
    }
  };

  // Fetch theatres based on city
  const handleCityChange = async (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    try {
      if (newCity) {
        const response = await axios.get(`http://localhost:4000/auth/city/theatre/${newCity}`);
        setTheatres(response.data.theatres);
      }
    } catch (error) {
      console.error('Error fetching theatres:', error);
      toast.error('Failed to fetch theatres');
    }
  };

  // Fetch available movies for the selected theatre (updated to use Show model)
  const handleTheatreChange = async (e) => {
    const newTheatre = e.target.value;
    setSelectedTheatre(newTheatre);
    try {
      if (newTheatre) {
        // Fetch movies from show model
        const response = await axios.get(`http://localhost:4000/auth/getMoviesForTheatre/${newTheatre}`);
        setMovies(response.data.movies); 
      }
    } catch (error) {
      console.error('Error fetching movies for the selected theatre:', error);
      toast.error('Failed to fetch movies');
    }
  };

  // Fetch shows for the selected movie, theatre, and date
  const handleMovieChange = async (e) => {
    const newMovie = e.target.value;
    setSelectedMovie(newMovie);
    try {
      if (newMovie && selectedTheatre && selectedDate) {
        const response = await axios.get(`http://localhost:4000/auth/shows/${selectedTheatre}/${newMovie}/${selectedDate}`);
        setShows(response.data.shows);
      }
    } catch (error) {
      console.error('Error fetching shows:', error);
      toast.error('Failed to fetch shows');
    }
  };

  // Date change handler
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    // Fetch shows after the date is selected
    if (selectedMovie && selectedTheatre && newDate) {
      handleMovieChange({ target: { value: selectedMovie } });
    }
  };

  // Show selection handler
  const handleShowSelection = (e) => {
    const selectedShow = shows.find(show => show._id === e.target.value);
    setSelectedShow(selectedShow);
    setTotalPrice(selectedShow.price * quantity); // Calculate total price based on quantity
  };

  // Quantity change handler
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    if (selectedShow) {
      setTotalPrice(selectedShow.price * newQuantity);
    }
  };

  // Booking handler
  const handleBooking = async () => {
    if (!selectedShow || !quantity) {
      toast.error('Please select a show and ticket quantity');
      return;
    }

    try {
      const response = await axios.post('/api/book-ticket', {
        showId: selectedShow._id,
        userId: userData._id,
        quantity,
        totalPrice,
      });

      toast.success('Booking successful!');
      // Display the ticket confirmation details or navigate to a confirmation page
    } catch (error) {
      console.error('Error booking ticket:', error);
      toast.error('Failed to book ticket');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white flex flex-col justify-center py-12">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8">Choose a Show</h1>
      <div className="w-[90%] max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6">
        <form className="flex flex-col gap-6">
          {/* State Select */}
          <label htmlFor="state" className="md:text-lg font-semibold text-gray-700">
            State:
            <select name="state" id="state" onChange={handleStateChange} className="mt-2 p-3 rounded-lg border border-gray-300 w-[80%] md:w-[90%]">
              <option value="">Select a State</option>
              {states.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          {/* City Select */}
          <label htmlFor="city" className="md:text-lg font-semibold text-gray-700">
             City:
            <select name="city" id="city" onChange={handleCityChange} className="mt-2 p-3 rounded-lg border border-gray-300 w-[80%] md:w-[90%]">
              <option value="">Select a City</option>
              {cities.map(city => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>

          {/* Theatre Select */}
          <label htmlFor="theatre" className="text-lg font-semibold text-gray-700">
            Theatre:
            <select name="theatre" id="theatre" onChange={handleTheatreChange} className="mt-2 p-3 rounded-lg border border-gray-300 w-[80%] md:w-[90%]">
              <option value="">Select a Theatre</option>
              {theatres.map(theatre => (
                <option key={theatre._id} value={theatre._id}>
                  {theatre.name}
                </option>
              ))}
            </select>
          </label>

          {/* Movie Select */}
          <label htmlFor="movie" className="text-lg font-semibold text-gray-700">
            Movie:
            <select name="movie" id="movie" onChange={handleMovieChange} className="mt-2 p-3 rounded-lg border border-gray-300 w-[80%] md:w-[90%]">
              <option value="">Select a Movie</option>
              {movies.map(movie => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </label>

          {/* Date Select */}
          <label htmlFor="showDate" className="text-lg font-semibold text-gray-700 ">
            Show Date:
            <input type="date" id="showDate" onChange={handleDateChange} className="mt-2 p-3 rounded-lg border w-[80%] md:w-[90%] border-gray-300" />
          </label>

          {/* Show Select */}
          <label htmlFor="show" className="text-lg font-semibold text-gray-700">
            Show:
            <select name="show" id="show" onChange={handleShowSelection} className="mt-2 p-3 rounded-lg border border-gray-300 w-[80%] md:w-[90%]">
              <option value="">Select a Show</option>
              {shows.map(show => (
                <option key={show._id} value={show._id}>
                  {new Date(show.timeSlot).toLocaleString()} - {show.availableSeats} seats left - ₹{show.price}
                </option>
              ))}
            </select>
          </label>

          {/* Quantity Input */}
          <label htmlFor="quantity" className="text-lg font-semibold text-gray-700">
            Ticket Quantity:
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="mt-2 p-3 rounded-lg border border-gray-300 w-[80%] md:w-[90%]"
            />
          </label>

          {/* Total Price */}
          <div className="text-lg font-semibold text-gray-700 w-[80%] md:w-[90%]">
            Total Price: ₹{totalPrice}
          </div>

          {/* Booking Button */}
          <button
            type="button"
            onClick={handleBooking}
            className="mt-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-bold shadow-md hover:shadow-xl transition duration-300"
          >
            Book Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShowsPage;
