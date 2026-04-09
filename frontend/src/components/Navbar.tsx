import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Map routes → titles
  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/visitors":
        return "Visitors";
      case "/profile":
        return "Profile";
      default:
        return "VMS";
    }
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="font-semibold">{getTitle()}</h2>

      <div className="flex items-center gap-4">
        <span>{user?.name}</span>
        <button onClick={logout} className="text-red-500">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;