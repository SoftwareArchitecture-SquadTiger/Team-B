import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '200px', background: '#f4f4f4', padding: '10px' }}>
      <h3>Navigation</h3>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/statistics">Statistics</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;