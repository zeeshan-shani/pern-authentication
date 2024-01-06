import React from "react";

const UserPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Congratulations!</h1>
        <p style={styles.subtitle}>You have successfully logged in.</p>
      </div>

      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <i className="fas fa-check-circle" style={styles.icon}></i>
        </div>
        <p style={styles.message}>Welcome to your personalized user page.</p>
        <p style={styles.message}>
          Explore exciting features and content tailored just for you.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#4caf50',
    borderRadius: '50%',
    padding: '20px',
    marginBottom: '20px',
    animation: 'float 2s infinite alternate',
  },
  icon: {
    fontSize: '48px',
    color: '#fff',
  },
  message: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  // Animation keyframes
  '@keyframes float': {
    from: {
      transform: 'translateY(0)',
    },
    to: {
      transform: 'translateY(-10px)',
    },
  },
};

export default UserPage;
