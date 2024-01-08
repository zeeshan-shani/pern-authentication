import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Route, Routes } from "react-router-dom";

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      console.log("Please fill in all fields");
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        loginName: trimmedUsername,
        loginPassword: trimmedPassword,
      });
      // setLogin([...login, response.data]);
      console.log("Response", response.data);
      if (response?.data.token) {
        navigate("/userpage");
        sessionStorage.setItem("jwtToken", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);
        setIsAuthenticated(true);
        alert("Login successful!");
      } else {
        alert("User not found or invalid credentials!");
        setUsername("");
        setPassword("");
        return;
      }
    } catch (error) {
      alert("User not found or invalid credentials!");
      console.error("user don't exist", error.message);
      navigate("/register");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

export default LoginForm;
