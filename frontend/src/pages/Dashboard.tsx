import MainLayout from "../layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">Total Visitors</div>
        <div className="bg-white p-4 shadow rounded">Active</div>
        <div className="bg-white p-4 shadow rounded">Checked Out</div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;