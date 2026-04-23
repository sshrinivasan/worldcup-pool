import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h2>🔐 Admin Access Required</h2>
          <p>Please enter the admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="login-input-group">
            <label htmlFor="admin-password">Password:</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter admin password"
              autoFocus
              className="login-password-input"
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-submit-btn">
            Access Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
