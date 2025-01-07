import React from 'react';
import StatisticsPage from './modules/Statistics/pages/StatisticsPage';
import SettingsPage from './modules/Settings/pages/SettingsPage'
import DashboardPage from './modules/Dashboard/pages/DashboardPage';
import UsersPage from './modules/Users/pages/UsersPage'
import ProjectsPage from './modules/Projects/pages/ProjectsPage'
import AddCharityForm from './modules/AddUser/pages/AddCharityForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import AddProjectForm from "./modules/AddProject/pages/AddProjectForm";
import CloudinaryGallery from './modules/Image/pages/CloudinaryGallery';


function App() {
  return (
    <Router>
      <Routes>
        {/* Sign-In Page (Without Layout)
        <Route path="/signin" element={<SignInPage />} /> */}

        {/* Other Pages (With Layout) */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <UsersPage />
            </Layout>
          }
        />
        <Route
          path="/users/add"
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
              <SettingsPage />
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
          path="/projects"
          element={
            <Layout>
              <ProjectsPage />
            </Layout>
          }
        />

        <Route
          path="/add-project"
          element={
            <Layout>
              <AddProjectForm />
            </Layout>
          }
        />

        <Route
          path="/gallery"
          element={
            <Layout>
              <CloudinaryGallery />
            </Layout>
          }
        />
      </Routes>

      
    </Router>
  );
}

export default App;