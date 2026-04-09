import MainLayout from "../layouts/MainLayout";

const Visitors = () => {
  return (
    <MainLayout>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Visitors</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          + Add Visitor
        </button>
      </div>

      <div className="bg-white shadow rounded p-4">
        Visitor List Here
      </div>
    </MainLayout>
  );
};

export default Visitors;