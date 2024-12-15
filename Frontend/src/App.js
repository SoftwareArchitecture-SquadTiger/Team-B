import React from 'react';
import Statistics from './components/statistics/Statistics';
import Settings from './components/settings/Settings.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx';
import Users from './components/users/Users.jsx'
import AddCharityForm from './components/forms/AddCharityForm';
import SignInPage from './components/signin/SignInPage';
import ProjectManagementPage from './components/projects/ProjectManagementPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProjectForm from "./components/forms/AddProjectForm";
import Layout from './Layout';

// function App() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-gray-50">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800">Statistics</h2>
//           <div className="flex items-center">
//             <span className="text-gray-600 mr-2">Hi, Admin</span>
//             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//             <PersonOutlineIcon/> 
//             </div>
//           </div>
//         </div>
//         <StatisticsFilter />
//         <StatisticsChart />
//         <StatisticsAreaChart/>
//         <StatisticsPieChartForCategory/>
//         <StatisticsPieChartForCountry/>
//       </div>
//     </div>
//   );
// }
function App() {
  return (
    <Router>
      <Routes>
        {/* Sign-In Page (Without Layout)*/
        <Route path="/signin" element={<SignInPage />} /> }

        {/* Other Pages (With Layout) */}
        <Route
          path="/"
          element={
            <Layout>
            <Dashboard/>
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
            <Dashboard/>
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <Users />
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
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/statistics"
          element={
            <Layout>
              <Statistics />
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

        <Route
          path="/projects/add"
          element={
            <Layout>
              <AddProjectForm />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
