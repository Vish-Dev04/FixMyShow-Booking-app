import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    setBookings(storedHistory.reverse());
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h3 className="text-muted">No bookings found <FaSadTear /> </h3>
        <p>You haven't booked any movies yet.</p>
        <Link to="/" className="btn btn-bms mt-3">Browse Movies</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4"><FaTicket /> My Booking History</h2>
      
      <div className="row justify-content-center">
        <div className="col-md-8">
          {bookings.map((booking) => (
            <div key={booking.id} className="card mb-3 shadow-sm border-0 overflow-hidden">
              <div className="row g-0">
                <div className="col-4 col-sm-3">
                  <img 
                    src={booking.poster} 
                    className="img-fluid h-100" 
                    alt={booking.movieName}
                    style={{ objectFit: "cover", minHeight: "150px" }} 
                  />
                </div>

                <div className="col-8 col-sm-9">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="card-title fw-bold mb-1">{booking.movieName}</h5>
                      <span className="badge bg-success">Confirmed <TiTick /></span>
                    </div>
                    <p className="text-muted small mb-2">Order ID: #{booking.id}</p>
                    
                    <hr className="my-2" />

                    <div className="row mt-2" style={{fontSize: "0.9rem"}}>
                      <div className="col-6 mb-3">
                        <span className="text-muted d-block small">Date</span>
                        <strong>{booking.date}</strong>
                      </div>
                      
                      <div className="col-6 mb-3">
                          <span className="text-muted d-block small">Time</span>
                          <strong>{booking.time}</strong>
                      </div>

                      <div className="col-12 mb-3">
                          <span className="text-muted d-block small">Screen</span>
                          <strong className="text-primary">{booking.screen}</strong>
                      </div>

                      <div className="col-6">
                          <span className="text-muted d-block small">Seats</span>
                          <strong>{booking.seats}</strong>
                      </div>
                      
                      <div className="col-6">
                          <span className="text-muted d-block small">Total</span>
                          <strong className="text-danger">₹{booking.totalPrice}</strong>
                      </div>
                    </div>
                    </div>

                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;