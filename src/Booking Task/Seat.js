const Seat = ({ seat, selectSeat }) => {
  let className = "seat-btn ";

  if (seat.booked) className += "booked";
  else if (seat.selected) className += "selected";

  return (
    <button
      className={className}
      disabled={seat.booked}
      onClick={() => selectSeat(seat.id)}
    >
  
      {seat.id} 
    </button>
  );
};

export default Seat;