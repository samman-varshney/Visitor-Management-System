import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Visitors from "../pages/visitor/Visitors";
import AddVisitor from "../pages/visitor/AddVisitor";
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

        {/* ⭐ FIXED ROUTE */}
        <Route
          path="/add-visitor"
          element={
            // <ProtectedRoute allowedRoles={["guard"]}>
              <AddVisitor />   
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
