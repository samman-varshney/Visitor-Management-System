import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Visitors from "../pages/Visitors";
// import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute allowedRoles={["admin", "guard"]}>
              <Dashboard />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/visitors"
          element={
            // <ProtectedRoute allowedRoles={["admin", "guard"]}>
              <Visitors />
            // </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;