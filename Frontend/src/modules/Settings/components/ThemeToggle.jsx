import React from "react";

const ThemeToggle = ({ darkMode, handleThemeToggle }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">Themes</h3>
      <p className="text-sm text-gray-600 mb-4">
        A simple toggle switch with labels for "Light Mode" and "Dark Mode"
      </p>
      <div className="flex items-center">
        <label htmlFor="themeToggle" className="mr-4 text-gray-800">
          {darkMode ? "Dark Mode" : "Light Mode"}
        </label>
        <button
          id="themeToggle"
          className={`w-12 h-6 rounded-full p-1 flex items-center ${
            darkMode ? "bg-gray-800" : "bg-gray-300"
          }`}
          onClick={handleThemeToggle}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transform ${
              darkMode ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
