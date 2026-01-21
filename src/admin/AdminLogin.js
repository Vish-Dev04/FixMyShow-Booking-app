// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = ({ onLogin }) => {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (credentials.email === "admin@gmail.com" && credentials.password === "admin123") {
//       onLogin({ role: "admin", name: "Theater Owner" });
//       navigate("/admin/dashboard"); 
//     } else {
//       setError("Invalid Admin Credentials");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card shadow p-4" style={{ width: "400px" }}>
//         <h3 className="text-center mb-4">🎭 Theater Admin</h3>
        
//         {error && <div className="alert alert-danger">{error}</div>}
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Admin Email</label>
//             <input 
//               type="email" 
//               name="email" 
//               className="form-control" 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input 
//               type="password" 
//               name="password" 
//               className="form-control" 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//           <button type="submit" className="btn btn-dark w-100">
//             Access Dashboard
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;