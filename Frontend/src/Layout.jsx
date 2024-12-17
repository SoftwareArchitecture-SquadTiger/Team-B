import React from 'react';
import Sidebar from './components/SideBar';

function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-[20%] p-6 bg-gray-50 overflow-y-auto min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default Layout;
