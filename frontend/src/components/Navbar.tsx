import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="font-semibold">Dashboard</h2>

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