import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Route, Routes } from "react-router-dom";

const RegisterUser = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, setRegisterUser] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      console.log("Please fill in all fields");
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register-user",
        {
          userExist: trimmedUsername,
          email: trimmedEmail,
          password: trimmedPassword,
        }
      );
      const { token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
      console.log("token here", token);
      setRegisterUser([...registerUser, response.data]);

      if (token) {
        setIsAuthenticated(true);
        navigate("/userpage");
        alert("Registration successful!");
      } else {
        alert("Registration failed. Please try again.");
      }
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register User</h2>
      <div style={styles.formContainer}>
        <label style={styles.label}>Username:</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          required="true"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
  },
  input: {
    marginBottom: "15px",
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default RegisterUser;
