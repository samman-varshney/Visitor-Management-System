import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { getVisits } from "../../services/visitApi";
import VisitorCard from "./VisitorCard";
import type { VisitRequest } from "../../types/visit";
import { useNavigate } from "react-router-dom";

const Visitors = () => {
  const [visits, setVisits] = useState<VisitRequest[]>([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchVisits = async () => {
    try {
      const data = await getVisits();
      setVisits(data);
    } catch (err) {
      console.error("Error fetching visits:", err);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const filteredVisits =
    filter === "all"
      ? visits
      : visits.filter((v) => v.status === filter);

  return (
    <MainLayout>

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Visitors</h1>

        <button
          onClick={() => navigate("/add-visitor")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Visitor
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {["all", "pending", "approved", "in", "out"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 border rounded ${
              filter === f ? "bg-black text-white" : ""
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredVisits.length === 0 && (
        <p className="text-gray-500">No visitors found</p>
      )}

      {filteredVisits.map((visit) => (
        <VisitorCard key={visit.id} visit={visit} refresh={fetchVisits} />
      ))}

    </MainLayout>
  );
};

export default Visitors;