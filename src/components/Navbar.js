import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assests/fixmyshow_logo.png"; 
import SignIn from "./SignIn";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const closeNav = () => {
    setIsNavExpanded(false);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowModal(false);
    closeNav();

    if (userData.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    closeNav();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeNav}>
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
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            aria-controls="navbarNav"
            aria-expanded={isNavExpanded}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div 
            className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`} 
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={closeNav}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies" onClick={closeNav}>Movies</Link>
              </li>

              {user && user.role === "admin" ? (
                <li className="nav-item">
                  <Link 
                    className="nav-link fw-bold text-warning" 
                    to="/admin/dashboard" 
                    onClick={closeNav}
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/bookings" onClick={closeNav}>My Bookings</Link>
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
                    onClick={() => {
                      setShowModal(true);
                      closeNav();
                    }}
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