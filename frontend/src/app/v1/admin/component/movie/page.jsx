'use client';
import React from 'react'
import { getAllMovies } from '@/store/MovieSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
function MoviePanel() {
  const { movies, loading } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleDeleteMovie=async(movieId)=>{
    console.log(movieId);
    try {
      const response= await axios.delete(`http://localhost:4000/auth/admin/movie/delete/${movieId}`,{withCredentials: true});
      console.log(response);
      dispatch(getAllMovies());
      toast.success("deleted successfully")
    
    } catch (error) {
      toast.error("movie not deleted");
      console.log(error);
    }

  }

  const handleUpdateMovie=(e)=>{ 

   }


  return (
    <div className='w-full min-h-screen text-center bg-white text-black'>
      <div>
        <h1>Movie Panel</h1>
        <div className='w-[80%] bg-blue-500 mx-auto mt-2 md:mt-28'>
          <Link href={'/v1/admin/component/movie/addmovie'}>Add Movie</Link>



        </div>

        <div className='flex flex-col'>
          <h1 className='text-3xl font-extrabold text-center mt-2'>All movies</h1>
          {movies.map((movie) => {
            return (<div className='w-[80%] bg-blue-500 mx-auto mt-2 min-h[5rem] '>
              <div key={movie?._id} className='flex flex-row gap-3 text-center'>
                <h1>Title: {movie?.title}</h1>
                <h1>Description: {movie?.description.slice(0, 40)}</h1>
                <h1>Duration: {movie?.duration} minutes</h1>
                <h1>Language: {movie?.language}</h1>
                <button className='bg-yellow-400 p-1 rounded-md'
                onClick={()=>handleUpdateMovie(movie?._id)}
                >edit</button>
                <button className='bg-red-400 p-1 rounded-md' onClick={()=>handleDeleteMovie(movie?._id)}>delete</button>

              </div>
            </div>
            )
          })}




        </div>
      </div>



    </div>
  )
}

export default MoviePanel