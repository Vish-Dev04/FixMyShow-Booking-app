import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState({
    id: Date.now(), 
    title: "",
    genre: "",
    poster: "", 
    status: "Now Showing", 
    screens: 1
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingMovies = JSON.parse(localStorage.getItem("adminMovies")) || [];
  
    const updatedMovies = [...existingMovies, movie];

    localStorage.setItem("adminMovies", JSON.stringify(updatedMovies));

    alert("Movie Added Successfully! 🎬");
    navigate("/admin/dashboard"); 
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4">🎥 Add New Movie</h3>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">Movie Title</label>
            <input 
              type="text" name="title" className="form-control" 
              value={movie.title} onChange={handleChange} required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Genre</label>
            <input 
              type="text" name="genre" className="form-control" 
              placeholder="e.g. Action, Drama"
              value={movie.genre} onChange={handleChange} required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Poster Image URL</label>
            <input 
              type="text" name="poster" className="form-control" 
              placeholder="https://example.com/image.jpg"
              value={movie.poster} onChange={handleChange} required 
            />
            <div className="form-text">Copy an image address from Google and paste it here.</div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select name="status" className="form-select" value={movie.status} onChange={handleChange}>
                <option>Now Showing</option>
                <option>Upcoming</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Screens</label>
              <input 
                type="number" name="screens" className="form-control" 
                value={movie.screens} onChange={handleChange} min="0"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100">Save Movie</button>
          <button 
            type="button" 
            className="btn btn-secondary w-100 mt-2" 
            onClick={() => navigate("/admin/dashboard")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;