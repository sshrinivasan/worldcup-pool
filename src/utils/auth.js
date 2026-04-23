// Simple authentication utility for admin access

const AUTH_KEY = 'worldcup_admin_auth';
const ADMIN_PASSWORD = 'worldcup2026admin'; // Change this to your desired password

// Check if admin is authenticated
export const isAdminAuthenticated = () => {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return false;

  try {
    const { authenticated, timestamp } = JSON.parse(authData);
    // Session expires after 24 hours
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const isExpired = Date.now() - timestamp > sessionDuration;

    return authenticated && !isExpired;
  } catch {
    return false;
  }
};

// Authenticate admin with password
export const authenticateAdmin = (password) => {
  if (password === ADMIN_PASSWORD) {
    const authData = {
      authenticated: true,
      timestamp: Date.now()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    return true;
  }
  return false;
};

// Logout admin
export const logoutAdmin = () => {
  localStorage.removeItem(AUTH_KEY);
};

// Get the admin password (for display purposes - you can remove this in production)
export const getAdminPassword = () => {
  return ADMIN_PASSWORD;
};
