import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white p-4">
      <h1 className="text-xl font-bold mb-6">VMS</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/visitors">Visitors</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </div>
  );
};

export default Sidebar;