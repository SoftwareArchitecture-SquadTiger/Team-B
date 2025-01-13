import React, { useState } from 'react';

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false); // State for theme toggle
  const [language, setLanguage] = useState('English'); // State for selected language
  const [content, setContent] = useState({
    heading: 'Settings',
    theme: {
      title: 'Themes',
      description: 'A simple toggle switch with labels for "Light Mode" and "Dark Mode"',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },
    language: {
      title: 'Languages',
      description: 'Change the language here',
    },
  });

  // Handle theme toggle
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    // Update content based on selected language
    const translations = {
      English: {
        heading: 'Settings',
        theme: {
          title: 'Themes',
          description: 'A simple toggle switch with labels for "Light Mode" and "Dark Mode"',
          lightMode: 'Light Mode',
          darkMode: 'Dark Mode',
        },
        language: {
          title: 'Languages',
          description: 'Change the language here',
        },
      },
      Vietnamese: {
        heading: 'Cài Đặt',
        theme: {
          title: 'Chủ Đề',
          description: 'Một công tắc đơn giản để chuyển đổi giữa "Chế Độ Sáng" và "Chế Độ Tối"',
          lightMode: 'Chế Độ Sáng',
          darkMode: 'Chế Độ Tối',
        },
        language: {
          title: 'Ngôn Ngữ',
          description: 'Thay đổi ngôn ngữ tại đây',
        },
      },
      Korean: {
        heading: '설정',
        theme: {
          title: '테마',
          description: '"라이트 모드"와 "다크 모드" 간 전환을 위한 간단한 토글 스위치',
          lightMode: '라이트 모드',
          darkMode: '다크 모드',
        },
        language: {
          title: '언어',
          description: '여기에서 언어를 변경하세요',
        },
      },
    };

    setContent(translations[selectedLanguage]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{content.heading}</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 max-w-md">
        {/* Themes Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">{content.theme.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{content.theme.description}</p>
          <div className="flex items-center">
            <label htmlFor="themeToggle" className="mr-4 text-gray-800">
              {darkMode ? content.theme.darkMode : content.theme.lightMode}
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
          <h3 className="text-lg font-medium text-gray-800 mb-2">{content.language.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{content.language.description}</p>
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
      </div>
    </div>
  );
}

export default SettingsPage;
