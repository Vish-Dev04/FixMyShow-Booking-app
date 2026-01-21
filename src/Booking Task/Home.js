import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; 
import moviesData from "./tamil_movies.json"; 
import upcomingData from "./UpcomingMovies.json";
import MovieCard from "./MovieCard";
import "../App.css"; 
import { PiFilmSlateFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";


const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("adminMovies"));
    
    if (storedMovies) {
      setMovies(storedMovies);
    } else {
      setMovies(moviesData.tamilMovies);
    }
  }, []);

  const displayMovies = movies.length > 0 ? movies : moviesData.tamilMovies;
  const trendingMovies = displayMovies.slice(0, 5);
  
  const upcomingMovies = upcomingData.upcomingMovies.slice(0, 5);

  return (
    <div className="container mt-4">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0"><PiFilmSlateFill /> Now Showing</h3>
        <Link to="/movies" className="btn btn-outline-danger btn-sm">
          View All &rarr;
        </Link>
      </div>

      <div className="movie-slider-container">
        {trendingMovies.map((movie, index) => (
          <div key={index} className="slider-card">
            <MovieCard movie={movie} /> 
          </div>
        ))}
      </div>

      <hr className="my-5" />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0"><SlCalender /> Upcoming Movies</h3>
        <Link to="/movies" className="btn btn-outline-primary btn-sm">
          View All &rarr;
        </Link>
      </div>

      <div className="movie-slider-container">
        {upcomingMovies.map((movie, index) => (
          <div key={index} className="slider-card">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      
      <div className="mb-5"></div>
    </div>
  );
};

export default Home;