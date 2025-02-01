'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '@/store/MovieSlice'

function MoviesPage() {
  const [isClient, setIsClient] = useState(false);
  const { movies, loading } = useSelector((state) => state.movies)
  const dispatch = useDispatch()

  // State to control the visibility of movie details
  const [openMovieId, setOpenMovieId] = useState(null)

  useEffect(() => {
    dispatch(getAllMovies())
    setIsClient(true);
  }, [dispatch])

  const toggleDetails = (id) => {
    setOpenMovieId(openMovieId === id ? null : id) // Toggle visibility of movie details
  }
  if (!isClient) {
    return null; // or a loading spinner
  }

  if (loading) return <div className="text-center">Loading movies...</div>

  return (
    <div className='w-full bg-gray-100 min-h-screen p-5 flex flex-wrap gap-5'>
      {movies.map((movie) => (
        <div
          key={movie._id}
          className='bg-white text-black w-[250px] h-[30%] rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105'
          onClick={() => toggleDetails(movie._id)} // Toggle the details on click
        >
          <div className="relative h-[70%]">
            {/* Small Poster */}
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={150}
              height={225}
              className="object-cover rounded-t-lg"
            />
            {/* Expand/Collapse Button */}
            <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full cursor-pointer">
              {openMovieId === movie._id ? '-' : '+'}
            </div>
          </div>

          <div className="p-4 h-[30%] overflow-hidden">
            <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.releaseDate}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-yellow-500 font-semibold">{movie.rating}</span>
            </div>

            {openMovieId === movie._id && (
              <div className="mt-3 text-sm text-gray-800 overflow-auto">
                <h3 className="font-medium">Description:</h3>
                <p>{movie.description}</p>
                <h3 className="font-medium mt-2">Genre:</h3>
                <p>{movie.genere}</p>
                <h3 className="font-medium mt-2">Language:</h3>
                <p>{movie.language}</p>
                <h3 className="font-medium mt-2">Duration:</h3>
                <p>{movie.duration} minutes</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoviesPage
