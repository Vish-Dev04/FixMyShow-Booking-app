import React, { useState, useEffect } from "react";
import moviesData from "./tamil_movies.json"; 
import upcomingData from "./UpcomingMovies.json"; 
import MovieCard from "./MovieCard";
import { PiFilmSlateFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // 1. Check for Admin updates in Local Storage
    const storedMovies = JSON.parse(localStorage.getItem("adminMovies"));
    
    if (storedMovies) {
      setMovies(storedMovies);
    } else {
      // 2. Fallback to JSON file if no updates exist
      setMovies(moviesData.tamilMovies);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="mb-5">
        <h3 className="mb-3 border-start border-4 border-danger ps-2"><PiFilmSlateFill/> Now Showing</h3>
        
        {/* CHANGED: Now mapping 'movies' state instead of 'moviesData' */}
        <div className="row">
          {movies.map((movie, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3 mb-4">
               <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <hr className="my-5" />

      <div>
        <h3 className="mb-3 border-start border-4 border-primary ps-2"><SlCalender />  Coming Soon</h3>
        <div className="row">
          {upcomingData.upcomingMovies.map((movie, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 border-0 shadow-sm" style={{ opacity: "0.8" }}>
                <img
                  src={movie.poster}
                  alt={movie.name}
                  className="card-img-top rounded"
                  style={{ height: "300px", objectFit: "cover", filter: "grayscale(30%)" }}
                />
                <div className="card-body">
                  <h5 className="card-title fs-6 fw-bold">{movie.name}</h5>
                  <p className="card-text small text-muted">{movie.genre}</p>
                  <button className="btn btn-secondary btn-sm w-100 disabled">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Movies;