import React, { useState } from "react";
// import axios from "axios";
import RegisterUser from "./components/Register";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import LoginForm from "./components/Login";
import UserPage from "./components/UserPage";
import LandingPage from "./components/LandingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const retrievedToken = sessionStorage.getItem("jwtToken");


  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/register"
          element={<RegisterUser setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/userpage"
          element={retrievedToken ? <UserPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;
