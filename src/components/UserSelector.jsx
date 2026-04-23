import React from 'react';
import { friends } from '../data/matches';

const UserSelector = ({ selectedUser, onUserChange }) => {
  return (
    <div className="user-selector">
      <label htmlFor="user-select">Select Your Name:</label>
      <select
        id="user-select"
        value={selectedUser}
        onChange={(e) => onUserChange(e.target.value)}
        className="user-dropdown"
      >
        <option value="">-- Choose Friend --</option>
        {friends.map((friend) => (
          <option key={friend} value={friend}>
            {friend}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
