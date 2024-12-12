import React from 'react';
import Sidebar from './components/sidebar/Sidebar';

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">{children}</div>
    </div>
  );
}

export default Layout;