import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";

import Dashboard from "./modules/Dashboard/pages/DashboardPage.jsx";
import Login from "./modules/Auth/pages/LoginPage.jsx";
import Projects from "./modules/Projects/pages/ProjectsPage.jsx";
import Settings from "./modules/Settings/pages/SettingsPage.jsx";
import Statistics from "./modules/Statistics/pages/StatisticsPage.jsx";
import Users from "./modules/Users/pages/UsersPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />

        <Route element={<ProtectedRoutes />}>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Projects />} path="/projects" />
          <Route element={<Settings />} path="/settings" />
          <Route element={<Statistics />} path="/statistics" />
          <Route element={<Users />} path="/users" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
