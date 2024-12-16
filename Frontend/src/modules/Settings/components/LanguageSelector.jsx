import React from "react";

const LanguageSelector = ({ language, handleLanguageChange }) => {
  return (
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
        <option value="Korean">Korean</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
