import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (

    <div className="card h-100  border-0 shadow-sm">
      <Link to={`/movie/${movie.name}`} className="text-decoration-none text-dark">
        <div className="movie-card p-2">
          <img
            src={movie.poster}
            alt={movie.name}
            className="card-img-top rounded shadow-sm"
            style={{ height: "300px", objectFit: "cover" }} 
          />
          <div className="text-start mt-2">
            <h5 className="movie-title text-truncate">{movie.name}</h5>
            <p className="movie-genre text-muted small text-truncate">{movie.genre}</p>
          </div>

          <button className="btn btn-bms w-100 btn-sm mt-1">Book Now</button>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;