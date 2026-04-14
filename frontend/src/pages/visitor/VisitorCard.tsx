import type { VisitRequest } from "../../types/visit";
import { checkInVisit, checkOutVisit } from "../../services/visitApi";
import { useAuth } from "../../context/AuthContext";

interface Props {
  visit: VisitRequest;
  refresh: () => void;
}

const VisitorCard = ({ visit, refresh }: Props) => {
  const { user } = useAuth();

  const handleCheckIn = async () => {
    await checkInVisit(visit.id);
    refresh();
  };

  const handleCheckOut = async () => {
    await checkOutVisit(visit.id);
    refresh();
  };

  return (
    <div className="border p-4 rounded mb-3 bg-white shadow">

      {/* Names */}
      <h3 className="font-bold text-lg">
        {visit.visitors.map((v) => v.name).join(", ")}
      </h3>

      {/* Meta */}
      <p className="text-sm text-gray-500">{visit.purpose}</p>

      <p className="text-xs text-gray-400">
        {visit.visitors.length} visitor(s) • {visit.visitType}
      </p>

      {/* Professional Info */}
      {visit.visitType === "professional" && (
        <p className="text-blue-500 text-sm">
          {visit.companyName} • {visit.designation}
        </p>
      )}

      {/* Informal Relation */}
      {visit.visitType === "informal" && (
        <p className="text-purple-500 text-sm">
          {visit.visitors.map((v) => v.relation).join(", ")}
        </p>
      )}

      {/* Status */}
      <p className="mt-2 font-semibold">
        Status:{" "}
        <span
          className={
            visit.status === "pending"
              ? "text-yellow-500"
              : visit.status === "approved"
              ? "text-blue-500"
              : visit.status === "in"
              ? "text-green-500"
              : visit.status === "out"
              ? "text-gray-500"
              : "text-red-500"
          }
        >
          {visit.status}
        </span>
      </p>

      {/* ---------------- ACTIONS ---------------- */}

      {/* APPROVE / REJECT (host + admin) */}
      {(user?.role === "host" || user?.role === "admin") &&
        visit.status === "pending" && (
          <div className="mt-2 flex gap-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded">
              Approve
            </button>

            <button className="bg-red-500 text-white px-3 py-1 rounded">
              Reject
            </button>
          </div>
      )}

      {/* CHECK-IN (guard + admin) */}
      {(user?.role === "guard" || user?.role === "admin") &&
        visit.status === "approved" && (
          <button
            onClick={handleCheckIn}
            className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
          >
            Check-In
          </button>
      )}

      {/* CHECK-OUT */}
      {(user?.role === "guard" || user?.role === "admin") &&
        visit.status === "in" && (
          <button
            onClick={handleCheckOut}
            className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
          >
            Check-Out
          </button>
      )}

      {/* Completed */}
      {visit.status === "out" && (
        <p className="text-gray-400 mt-2">Visit Completed</p>
      )}

    </div>
  );
};

export default VisitorCard;