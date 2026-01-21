import { useState, useEffect } from "react";
import Seat from "./Seat"; 
import { useNavigate } from "react-router-dom";

const SCREENS = ["Screen 1 (PVR Cinemas)", "Screen 2 (IMAX)", "Screen 3 (Sri Sakthi Cinemas)"];
const TIMES = ["09:00 AM", "12:30 PM", "04:00 PM", "07:30 PM", "10:30 PM"];

const SEATS_PER_ROW = 10;
const ROW_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"]; 
const TOTAL_SEATS = SEATS_PER_ROW * ROW_LABELS.length; 
// ----------------------------------------------

const generateDates = () => {
  const dateList = [];
  const today = new Date();
  for (let i = 0; i < 5; i++) { 
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dateList.push({
      fullDate: d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    });
  }
  return dateList;
};

const Booking = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  
  const [dates] = useState(generateDates);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(SCREENS[0]); 
  const [selectedTime, setSelectedTime] = useState("");
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const storedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
    if (!storedMovie) {
      navigate("/");
    } else {
      setMovie(storedMovie);
      setSelectedDate(dates[0]); 
      setSelectedTime(TIMES[1]);
    }
  }, [navigate, dates]);

  useEffect(() => {
    if (!movie || !selectedDate) return;

    const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    const occupiedSeats = new Set();

    history.forEach(booking => {
      const isSameMovie = booking.movieName === movie.name;
      const isSameDate = booking.date === selectedDate.fullDate;
      const isSameTime = booking.time === selectedTime;
      const isSameScreen = booking.screen === selectedScreen;

      if (isSameMovie && isSameDate && isSameTime && isSameScreen) {
        const bookedIds = booking.seats.split(", ").map(Number);
        bookedIds.forEach(id => occupiedSeats.add(id));
      }
    });


    const newSeats = Array.from({ length: TOTAL_SEATS }, (_, i) => ({
      id: i + 1,
      selected: false,
      booked: occupiedSeats.has(i + 1) 
    }));

    setSeats(newSeats);

  }, [selectedDate, selectedScreen, selectedTime, movie]);

  const selectSeat = (id) => {
    setSeats(seats.map((seat) => {
      if (seat.id === id && !seat.booked) {
        return { ...seat, selected: !seat.selected };
      }
      return seat;
    }));
  };

  const handleConfirm = () => {
    const selectedSeats = seats.filter((s) => s.selected);
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const newBooking = {
      id: Date.now(),
      movieName: movie.name,
      poster: movie.poster,
      seats: selectedSeats.map(s => s.id).join(", "),
      date: selectedDate.fullDate, 
      time: selectedTime,    
      screen: selectedScreen,
      totalPrice: selectedSeats.length * 200 
    };

    const existingHistory = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    existingHistory.push(newBooking);
    localStorage.setItem("bookingHistory", JSON.stringify(existingHistory));
    
    navigate("/summary");
  };

  if (!movie || !selectedDate) return null; 

  return (
    <div className="container-fluid bg-light min-vh-100 pb-5">
      <div className="bg-white shadow-sm py-3 mb-3">
        <div className="container">
          <h3 className="fw-bold mb-0">{movie.name}</h3>
          <small className="text-muted">{movie.genre} • {movie.language || "Tamil"}</small>
        </div>
      </div>

      <div className="container">

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            
            <div className="mb-4">
              <label className="fw-bold text-muted small mb-2">SELECT DATE</label>
              <div className="d-flex gap-3 overflow-auto pb-2">
                {dates.map((dateObj, index) => (
                  <button 
                    key={index} 
                    className={`btn date-card ${selectedDate.fullDate === dateObj.fullDate ? 'active-date' : ''}`}
                    onClick={() => setSelectedDate(dateObj)}
                  >
                    <div className="small fw-bold">{dateObj.dayName}</div>
                    <div className="fs-5 fw-bold">{dateObj.dayNum}</div>
                    <div className="small">{dateObj.month}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-5">
                <label className="fw-bold text-muted small mb-2">SELECT SCREEN</label>
                <select 
                  className="form-select" 
                  value={selectedScreen} 
                  onChange={(e) => setSelectedScreen(e.target.value)}
                >
                  {SCREENS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-md-7">
                <label className="fw-bold text-muted small mb-2">SELECT TIME</label>
                <div className="d-flex flex-wrap gap-2">
                  {TIMES.map((time) => (
                    <button 
                      key={time} 
                      className={`btn btn-sm px-3 py-2 ${selectedTime === time ? 'btn-success' : 'btn-outline-secondary'}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="screen-container text-center mb-5 mt-5">
          <div className="screen mx-auto mb-3"></div>
          <p className="small text-muted letter-spacing-2">SCREEN THIS WAY</p>
        </div>


        <div className="d-flex flex-column align-items-center mb-5">
          {ROW_LABELS.map((label, rowIndex) => {
             const start = rowIndex * SEATS_PER_ROW;
             const end = start + SEATS_PER_ROW;
             
             const rowSeats = seats.slice(start, end);
             return (
               <div key={label} className="d-flex align-items-center mb-3">
                 <div className="me-3 fw-bold text-muted" style={{ width: "20px" }}>
                   {label}
                 </div>

                 <div className="d-flex gap-2">
                   {rowSeats.map((seat) => (
                     <Seat key={seat.id} seat={seat} selectSeat={selectSeat} />
                   ))}
                 </div>
               </div>
             );
          })}
        </div>

      </div>
      <div className="fixed-bottom bg-white shadow-lg p-3 border-top">
        <div className="container d-flex justify-content-between align-items-center">
           <div>
             <div className="text-muted small">
                {selectedScreen} | {selectedDate.fullDate} | {selectedTime}
             </div>
             <h4 className="m-0 fw-bold">₹ {seats.filter(s => s.selected).length * 200}</h4>
           </div>
           <button className="btn btn-danger btn-lg px-5" onClick={handleConfirm}>
             Book Ticket
           </button>
        </div>
      </div>
      
      <div style={{height: "80px"}}></div>
    </div>
  );
};

export default Booking;