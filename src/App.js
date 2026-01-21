import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./Booking Task/Home";
import Booking from "./Booking Task/Booking";
import MovieDetails from "./Booking Task/Details";
import Summary from "./Booking Task/Summary";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar  from "./components/Navbar";
import Footer from "./components/Footer";
import Movies from "./Booking Task/Movies";
import BookingHistory from "./Booking Task/BookingHistory";
import AdminDashboard from "./admin/AdminDashboard";
// import AddMovie from "./admin/AddMovie";
// import AdminDashboard from "./admin/AdminDashboard";
// import AdminLogin from "./admin/AdminLogin";
// import SignIn from "./components/SignIn";
// import { useState,useNavigate } from "react";






function App() {


  return (
    <div>
      
     <BrowserRouter>
     <Navbar></Navbar>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies></Movies>} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/bookings" element={<BookingHistory />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Home />} />
      </Routes>
      <Footer></Footer>
     </BrowserRouter>
    </div> 
  );
}

export default App;
