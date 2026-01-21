import { useParams, useNavigate } from "react-router-dom";
import moviesData from "./tamil_movies.json"; 




const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = moviesData.tamilMovies.find((m) => m.name === id);

  if (!movie) return <div className="text-center mt-5">Movie not found</div>;

  const handleBooking = () => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/booking");
  };

  return (
    <div>

      <div className="movie-banner">
        <div 
          className="banner-bg" 
          style={{ backgroundImage: `url(${movie.poster})` }}
        ></div>
        
        <div className="container banner-content">
          <div className="row align-items-center">
            <div className="col-md-3 col-sm-4 text-center">
              <img 
                src={movie.poster} 
                alt={movie.name} 
                className="img-fluid rounded shadow-lg" 
                style={{maxHeight: '400px'}}
              />
            </div>
            <div className="col-md-9 col-sm-8 text-white">
              <h1 className="fw-bold display-4 mb-3">{movie.name}</h1>
              
              <div className="d-flex align-items-center mb-3">
                 <span className="badge bg-light text-dark me-2">2D</span>
                 <span className="badge bg-light text-dark me-3">TAMIL</span>
              </div>

              <p className="fs-5 mb-2">{movie.genre}</p>
              <p className="small mb-4">{movie.director} • {movie.cast.slice(0, 3).join(", ")}</p>

              <button onClick={handleBooking} className="btn btn-bms">
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5" style={{maxWidth: "800px", marginLeft: "0"}}>
        <h4>About the movie</h4>
        <p className="text-muted mt-2" style={{lineHeight: "1.6"}}>
          Prepare for an adrenaline-pumping experience with {movie.name}. 
          Directed by the visionary {movie.director}, this film features a 
          stellar performance by {movie.cast[0]}. Don't miss the action on the big screen!
        </p>
      </div>
    </div>
  );
};

export default Details;