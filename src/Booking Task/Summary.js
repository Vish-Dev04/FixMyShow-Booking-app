import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const Summary = () => {
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("bookingHistory"));
    
    if (!history || history.length === 0) {
      navigate("/");
      return;
    }
    const lastBooking = history[history.length - 1];
    setBooking(lastBooking);
  }, [navigate]);

  if (!booking) return null;

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-header bg-success text-white text-center py-3">
          <h4 className="m-0"><TiTick />Booking Confirmed!</h4>
        </div>
        
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <img 
              src={booking.poster} 
              alt={booking.movieName} 
              className="rounded shadow-sm"
              style={{ width: "120px", height: "180px", objectFit: "cover" }}
            />
            <h4 className="mt-3 fw-bold">{booking.movieName}</h4>
          </div>

          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span className="text-muted">Date</span>
              <span className="fw-bold text-dark">{booking.date}</span>
            </li>
            
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span className="text-muted">Time</span>
              <span className="fw-bold text-dark">{booking.time}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span className="text-muted">Screen</span>
              <span className="fw-bold text-primary">{booking.screen}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span className="text-muted">Seats</span>
              <span className="fw-bold text-dark">{booking.seats}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center bg-light">
              <span className="text-muted">Total Amount</span>
              <span className="fw-bold text-danger fs-5">₹ {booking.totalPrice}</span>
            </li>
          </ul>

          <div className="d-grid gap-2">
            <Link to="/history" className="btn btn-outline-primary">View My Bookings</Link>
            <Link to="/" className="btn btn-dark">Back to Home</Link>
          </div>
        </div>
        
        <div className="card-footer text-center text-muted small">
          Booking ID: {booking.id}
        </div>
      </div>
    </div>
  );
};

export default Summary;