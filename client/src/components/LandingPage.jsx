import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to Your Website</h1>
        <p style={styles.subtitle}>Explore amazing features and content.</p>
      </header>

      <div style={styles.features}>
        <div style={styles.feature}>
          <i className="fas fa-star" style={styles.icon}></i>
          <p>Feature 1: Discover Exciting Content</p>
        </div>
        <div style={styles.feature}>
          <i className="fas fa-heart" style={styles.icon}></i>
          <p>Feature 2: Personalized Experience</p>
        </div>
        <div style={styles.feature}>
          <i className="fas fa-globe" style={styles.icon}></i>
          <p>Feature 3: Connect Globally</p>
        </div>
      </div>

      <div style={styles.buttons}>
        <button style={styles.button} onClick={handleRegisterClick}>Register</button>
        <button style={styles.button} onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  feature: {
    width: '200px',
    padding: '20px',
    margin: '0 20px',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  icon: {
    fontSize: '24px',
    color: '#007bff',
    marginBottom: '10px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 10px',
  },
};

export default LandingPage;
