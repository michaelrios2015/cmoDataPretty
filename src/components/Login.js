import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    fontFamily: 'Arial, sans-serif',
  },
  box: {
    padding: '40px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '320px',
    backgroundColor: 'white',
  },
  title: {
    margin: 0,
    fontSize: '22px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    fontSize: '14px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  success: {
    textAlign: 'center',
    color: 'green',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: '13px',
  },
};

function LoginTest({ onLogin }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    try {
      await axios.post('/api/visitors', { email });
      localStorage.setItem('visitorEmail', email);
      setSubmitted(true);
      if (onLogin) onLogin();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div style={styles.box}>
        <h2 style={styles.title}>Thanks!</h2>
        <p style={styles.success}>Your email has been saved.</p>
      </div>
    );
  }

  return (
    <div style={styles.box}>
      <h2 style={styles.title}>Sign up for free</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          style={styles.input}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <div style={styles.error}>{error}</div>}
        <button style={styles.button} type="submit">Continue</button>
      </form>
    </div>
  );
}

export default LoginTest;
