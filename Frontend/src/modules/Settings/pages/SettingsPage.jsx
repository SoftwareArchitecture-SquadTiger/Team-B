import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import SettingsHeader from "./SettingsHeader";

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false); // State for theme toggle
  const [language, setLanguage] = useState("English"); // State for selected language

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <SettingsHeader />
      <div className="grid grid-cols-1 gap-8 max-w-md">
        <ThemeToggle darkMode={darkMode} handleThemeToggle={handleThemeToggle} />
        <LanguageSelector
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  );
}

export default SettingsPage;
