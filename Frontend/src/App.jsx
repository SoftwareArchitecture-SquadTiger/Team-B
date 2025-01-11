import React from 'react';
import StatisticsPage from './modules/Statistics/pages/StatisticsPage';
import SettingsPage from './modules/Settings/pages/SettingsPage'
import DashboardPage from './modules/Dashboard/pages/DashboardPage';
import UsersPage from './modules/Users/pages/UsersPage'
import ProjectsPage from './modules/Projects/pages/ProjectsPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import AddProjectForm from "./modules/AddProject/pages/AddProjectForm";
import CloudinaryGallery from './modules/Image/pages/CloudinaryGallery';
import AddUserPage from './modules/AddUser/pages/AddUserPage';
import LoginForm from './modules/Login/component/loginForm';
import { APIProvider } from './state/APIContext';


function App() {
  return (
    <APIProvider><Router>
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
              <AddUserPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
           
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <LoginForm />
            </div>
          
          
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
    </APIProvider>
  );
}

export default App;