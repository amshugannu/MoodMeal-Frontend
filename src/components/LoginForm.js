import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'; // optional for styling
import { jwtDecode } from "jwt-decode";


const LoginForm = () => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", formData);

      const { token, user } = response.data;

      // Save to localStorage (or context if used)
      localStorage.setItem("token", token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      const decoded = jwtDecode(token);
      const userId = decoded.id;
      localStorage.setItem("userId", userId);


      // Redirect to home
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Registration link */}
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
