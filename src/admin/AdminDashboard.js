import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaPlus } from "react-icons/fa";
import { PiFilmReelFill } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { FaClock } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import moviesData from "../Booking Task/tamil_movies.json"; 
import upcomingData from "../Booking Task/UpcomingMovies.json"; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  

  const [stats, setStats] = useState({ revenue: 0, tickets: 0 });
  const [activeTab, setActiveTab] = useState("dashboard"); 
  

  const [selectedMovieStats, setSelectedMovieStats] = useState(null);

  const [currentMovies, setCurrentMovies] = useState([]);

  const [newMovie, setNewMovie] = useState({
    name: "", genre: "", poster: "", director: "", cast: "", language: "Tamil"
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/"); 
      return;
    }
    setAdmin(user);

    const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    
    let myBookings = [];
    if (user.theaterId === "ssc01") {
       myBookings = history.filter(b => b.screen.includes("Screen 1") || b.screen.includes("Screen 3"));
    } else if (user.theaterId === "imax01") {
       myBookings = history.filter(b => b.screen.includes("Screen 2"));
    } else {
       myBookings = history; 
    }

    let totalRev = 0;
    let totalTix = 0;

    myBookings.forEach((booking) => {
        totalRev += booking.totalPrice;
        totalTix += booking.seats.split(",").length;
    });

    setStats({ revenue: totalRev, tickets: totalTix });

    const storedMovies = JSON.parse(localStorage.getItem("adminMovies"));
    if (storedMovies) {
        setCurrentMovies(storedMovies);
    } else {
        setCurrentMovies(moviesData.tamilMovies); 
        localStorage.setItem("adminMovies", JSON.stringify(moviesData.tamilMovies));
    }

  }, [navigate]);
  
  const handleAddMovie = (e) => {
    e.preventDefault();
    const movieObj = {
        ...newMovie,
        id: Date.now(),
        cast: newMovie.cast.split(","),
        rating: 8.5 
    };

    const updatedMovies = [...currentMovies, movieObj];
    setCurrentMovies(updatedMovies);
    localStorage.setItem("adminMovies", JSON.stringify(updatedMovies));
    
    alert("Movie Added Successfully!");
    setNewMovie({ name: "", genre: "", poster: "", director: "", cast: "", language: "Tamil" });
  };

  const handleDeleteMovie = (movieName) => {
    if(window.confirm(`Stop screening "${movieName}"?`)) {
        const updated = currentMovies.filter(m => m.name !== movieName);
        setCurrentMovies(updated);
        localStorage.setItem("adminMovies", JSON.stringify(updated));
    }
  };

  const handleViewDetails = (movieName) => {
    const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];

    const movieBookings = history.filter(b => b.movieName === movieName);

    const scheduleMap = {};

    movieBookings.forEach(booking => {
        const date = booking.date;
        const time = booking.time;
        const seatsCount = booking.seats.split(",").length;

        if (!scheduleMap[date]) {
            scheduleMap[date] = {};
        }
        if (!scheduleMap[date][time]) {
            scheduleMap[date][time] = 0;
        }
        
        scheduleMap[date][time] += seatsCount;
    });

    setSelectedMovieStats({ name: movieName, data: scheduleMap });
  };

  if (!admin) return null;

  return (
    <div className="container mt-5 mb-5">

      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
            <h2 className="fw-bold mb-0"> <RxDashboard /> {admin.name} Dashboard</h2>
            <span className="badge bg-dark text-warning">{admin.theaterId.toUpperCase()} ACCESS</span>
        </div>
        <div>
            <button className={`btn me-2 ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'}`} 
                onClick={() => setActiveTab('dashboard')}>
                 <SlCalender /> Stats
            </button>
            <button className={`btn ${activeTab === 'add-movie' ? 'btn-success' : 'btn-outline-success'}`} 
                onClick={() => setActiveTab('add-movie')}>
               <FaPlus /> Add Movie
            </button>
        </div>
      </div>


      {activeTab === 'dashboard' && (
        <>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card text-white bg-success shadow h-100">
                        <div className="card-body text-center">
                            <h3 className="card-title">My Collection</h3>
                            <h1 className="display-4 fw-bold">₹ {stats.revenue.toLocaleString()}</h1>
                            <p className="mb-0">Total Revenue from my screens</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card text-white bg-info shadow h-100">
                        <div className="card-body text-center">
                            <h3 className="card-title">Tickets Sold</h3>
                            <h1 className="display-4 fw-bold">{stats.tickets}</h1>
                            <p className="mb-0">Seats occupied</p>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="mb-3"><PiFilmReelFill /> Currently Screening</h4>
            <div className="table-responsive shadow-sm border rounded">
                <table className="table table-hover align-middle mb-0 bg-white">
                    <thead className="table-light">
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMovies.map((m, index) => (
                            <tr key={index}>
                                <td><img src={m.poster} alt="" style={{height:'60px', borderRadius:'4px'}}/></td>
                                <td className="fw-bold">{m.name}</td>
                                <td>{m.genre}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleDeleteMovie(m.name)}>
                                        Stop Screening
                                    </button>
                                    <button className="btn btn-sm btn-primary" onClick={() => handleViewDetails(m.name)}>
                                        <FaRegEye />View Shows
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedMovieStats && (
                <div className="card mt-4 border-primary shadow">
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 className="mb-0"><SlCalender /> Show Analysis: {selectedMovieStats.name}</h5>
                        <button className="btn btn-sm btn-light" onClick={() => setSelectedMovieStats(null)}><IoCloseSharp/> Close</button>
                    </div>
                    <div className="card-body">
                        {Object.keys(selectedMovieStats.data).length === 0 ? (
                            <p className="text-muted text-center">No bookings found for this movie yet.</p>
                        ) : (
                            <div className="row">
                                {Object.keys(selectedMovieStats.data).map((date, index) => (
                                    <div key={index} className="col-md-4 mb-3">
                                        <div className="card h-100 border-0 bg-light">
                                            <div className="card-body">
                                                <h6 className="fw-bold text-primary border-bottom pb-2"><SlCalender /> {date}</h6>
                                                <ul className="list-group list-group-flush bg-transparent">
                                                    {Object.entries(selectedMovieStats.data[date]).map(([time, count], i) => (
                                                        <li key={i} className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                                                            <span> <FaClock/> {time}</span>
                                                            <span className="badge bg-success rounded-pill">{count} sold</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            <div className="mt-5">
                <h4 className="text-muted"><SlCalender /> Upcoming Releases</h4>
                <div className="d-flex gap-3 overflow-auto pb-3">
                    {upcomingData.upcomingMovies.map((m, i) => (
                        <div key={i} className="card border-0 shadow-sm" style={{minWidth: '150px'}}>
                            <img src={m.poster} className="card-img-top" alt="" style={{height:'200px', objectFit:'cover'}}/>
                            <div className="card-body p-2 text-center">
                                <small className="fw-bold d-block text-truncate">{m.name}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
      )}

      {activeTab === 'add-movie' && (
          <div className="row justify-content-center">
              <div className="col-md-8">
                  <div className="card shadow border-0">
                      <div className="card-header bg-dark text-white">
                          <h5 className="mb-0">Add New Movie to Screens</h5>
                      </div>
                      <div className="card-body p-4">
                          <form onSubmit={handleAddMovie}>
                              <div className="row g-3">
                                  <div className="col-md-6">
                                      <label className="form-label">Movie Title</label>
                                      <input type="text" className="form-control" required 
                                        value={newMovie.name} onChange={e => setNewMovie({...newMovie, name: e.target.value})} />
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label">Genre</label>
                                      <input type="text" className="form-control" placeholder="Action, Drama..." required 
                                        value={newMovie.genre} onChange={e => setNewMovie({...newMovie, genre: e.target.value})} />
                                  </div>
                                  <div className="col-12">
                                      <label className="form-label">Poster URL (Image Link)</label>
                                      <input type="url" className="form-control" placeholder="https://..." required 
                                        value={newMovie.poster} onChange={e => setNewMovie({...newMovie, poster: e.target.value})} />
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label">Director</label>
                                      <input type="text" className="form-control" required 
                                        value={newMovie.director} onChange={e => setNewMovie({...newMovie, director: e.target.value})} />
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label">Cast (comma separated)</label>
                                      <input type="text" className="form-control" placeholder="Vijay, Trisha..." required 
                                        value={newMovie.cast} onChange={e => setNewMovie({...newMovie, cast: e.target.value})} />
                                  </div>
                              </div>
                              <div className="d-grid mt-4">
                                  <button type="submit" className="btn btn-primary">Publish Movie</button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;