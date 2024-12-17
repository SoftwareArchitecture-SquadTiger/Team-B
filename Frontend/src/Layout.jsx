import React from 'react';
import Sidebar from './components/SideBar';

function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-[20%] bg-gray-50 overflow-y-auto min-h-screen">
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
          {/* Empty div to maintain alignment */}
          <div></div>
          {/* Admin Info - Aligned to the far right */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-800 font-medium">Hi, Admin</span>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
