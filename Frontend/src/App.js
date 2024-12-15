import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import StatisticsPage from './components/pages/StatisticsPage';
import AddCharityForm from './components/pages/AddCharityForm';
import SystemSettingsPage from './components/pages/SystemSettingsPage';
import SignInPage from './components/pages/SignInPage';
import ProjectManagementPage from './components/pages/ProjectManagementPage'; // Import Project Management Page

function App() {
  return (
    <Router>
      <Routes>
        {/* Sign-In Page (Without Layout) */}
        <Route path="/signin" element={<SignInPage />} />

        {/* Other Pages (With Layout) */}
        <Route
          path="/"
          element={
            <Layout>
              <StatisticsPage />
            </Layout>
          }
        />
        <Route
          path="/add-charity"
          element={
            <Layout>
              <AddCharityForm />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <SystemSettingsPage />
            </Layout>
          }
        />
        <Route
          path="/statistics"
          element={
            <Layout>
              <StatisticsPage />
            </Layout>
          }
        />
        <Route
          path="/projects" // New route for Project Management Page
          element={
            <Layout>
              <ProjectManagementPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
