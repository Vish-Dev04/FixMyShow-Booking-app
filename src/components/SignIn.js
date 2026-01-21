import { useState } from "react";
import adminData from "./admin.json"; 

const SignIn = ({ show, onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGIC: HANDLE LOGIN ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // 1. Check if it is an ADMIN (from JSON file)
    const adminUser = adminData.find(
      (a) => a.email === formData.email && a.password === formData.password
    );

    if (adminUser) {
      onLogin(adminUser);
      onClose();
      return;
    }

    // 2. Check if it is a USER (from LocalStorage)
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const validUser = storedUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (validUser) {
      onLogin(validUser);
      onClose();
    } else {
      setError("Invalid email or password.");
    }
  };

  // --- LOGIC: HANDLE REGISTRATION ---
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError("");

    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check if email already exists
    if (storedUsers.some((u) => u.email === formData.email)) {
      setError("User already exists with this email.");
      return;
    }

    // Create new user object
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "user" // Default role is always user
    };

    // Save to Local Storage
    storedUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));

    setSuccessMsg("Account created! Please switch to Login.");
    setFormData({ name: "", email: "", password: "" }); // Clear form
    
    // Optional: Switch back to login view automatically after 1.5s
    setTimeout(() => setIsRegistering(false), 1500);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
          {/* Header with Toggle Tabs */}
          <div className="modal-header bg-dark text-white d-block">
             <div className="d-flex justify-content-between align-items-center mb-2">
               <h5 className="modal-title">{isRegistering ? "Create Account" : "Welcome Back"}</h5>
               <button className="btn-close btn-close-white" onClick={onClose}></button>
             </div>
             
             {/* Tabs to switch modes */}
             <ul className="nav nav-tabs border-bottom-0">
                <li className="nav-item">
                  <button 
                    className={`nav-link text-white ${!isRegistering ? "active bg-primary border-0" : ""}`} 
                    onClick={() => { setIsRegistering(false); setError(""); }}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link text-white ${isRegistering ? "active bg-primary border-0" : ""}`} 
                    onClick={() => { setIsRegistering(true); setError(""); }}
                  >
                    Register
                  </button>
                </li>
             </ul>
          </div>

          <div className="modal-body p-4">
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            {successMsg && <div className="alert alert-success py-2 small">{successMsg}</div>}
            
            <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
              
              {/* Show Name field ONLY if Registering */}
              {isRegistering && (
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange} 
                    required 
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  {isRegistering ? "Sign Up" : "Login"}
                </button>
              </div>
            </form>
          </div>

          {!isRegistering && (
             <div className="modal-footer justify-content-center bg-light">
               <small className="text-muted">
                 Admin Login? Use your provided credentials.
               </small>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;