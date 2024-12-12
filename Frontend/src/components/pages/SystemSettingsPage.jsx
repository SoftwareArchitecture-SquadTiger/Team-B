import React, { useState } from 'react';

function SystemSettingsPage() {
  const [darkMode, setDarkMode] = useState(false); // State for theme toggle
  const [language, setLanguage] = useState('English'); // State for selected language

  // Handle theme toggle
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    // Additional logic can be added here for applying dark mode styles
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Additional logic for language translation can be added here
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">System Setting Page</h2>
      <div className="grid grid-cols-1 gap-8 max-w-md">
        {/* Themes Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Themes</h3>
          <p className="text-sm text-gray-600 mb-4">
            A simple toggle switch with labels for "Light Mode" and "Dark Mode"
          </p>
          <div className="flex items-center">
            <label htmlFor="themeToggle" className="mr-4 text-gray-800">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </label>
            <button
              id="themeToggle"
              className={`w-12 h-6 rounded-full p-1 flex items-center ${
                darkMode ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              onClick={handleThemeToggle}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Languages Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Languages</h3>
          <p className="text-sm text-gray-600 mb-4">Change the language here</p>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="block w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="English">English</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SystemSettingsPage;
