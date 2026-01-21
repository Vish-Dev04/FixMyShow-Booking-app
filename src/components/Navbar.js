import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { useState, useEffect } from "react";
import logo from "../assests/fixmyshow_logo.png"; // Ensure this path matches your folder
import SignIn from "./SignIn";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  
  // 2. Initialize the navigation hook
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // --- UPDATED LOGIN HANDLER ---
  const handleLogin = (userData) => {
    // Save to storage
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowModal(false);

    // 3. REDIRECT BASED ON ROLE
    if (userData.role === "admin") {
      navigate("/admin/dashboard"); // Send Admin to Dashboard
    } else {
      navigate("/"); // Send User to Home
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Always go home on logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="FixMyShow Logo"
              height="50"
              className="me-2"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">Movies</Link>
              </li>

              {/* Show DASHBOARD for Admin, BOOKINGS for User */}
              {user && user.role === "admin" ? (
                 <li className="nav-item">
                   <Link className="nav-link fw-bold text-warning" to="/admin/dashboard">
                     Dashboard
                   </Link>
                 </li>
              ) : (
                 <li className="nav-item">
                   <Link className="nav-link" to="/bookings">My Bookings</Link>
                 </li>
              )}

              <li className="nav-item ms-3">
                {user ? (
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-white small">Hi, {user.name}</span>
                    <button 
                      className="btn btn-outline-danger btn-sm" 
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn btn-outline-light"
                    onClick={() => setShowModal(true)}
                  >
                    Sign In
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <SignIn 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onLogin={handleLogin} 
      />
    </>
  );
};

export default Navbar;