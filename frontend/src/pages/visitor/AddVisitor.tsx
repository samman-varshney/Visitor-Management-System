import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import { createVisit } from "../../services/visitApi";
import { useNavigate } from "react-router-dom";

type VisitType = "informal" | "professional" | "";

interface VisitorInput {
  name: string;
  phone: string;
  email?: string;
  relation?: string; // only for informal
  photo?: File | null;
}

const AddVisitor = () => {
  const navigate = useNavigate();

  const [visitType, setVisitType] = useState<VisitType>("");

  const [visitors, setVisitors] = useState<VisitorInput[]>([
    { name: "", phone: "", email: "", relation: "", photo: null },
  ]);

  const [form, setForm] = useState({
    purpose: "",
    hostId: "",
    companyName: "",
    designation: "",
  });

  // update visitor fields
  const handleVisitorChange = (
    index: number,
    field: keyof VisitorInput,
    value: any
  ) => {
    const updated = [...visitors];
    updated[index][field] = value;
    setVisitors(updated);
  };

  // add new person
  const addVisitor = () => {
    if (visitors.length >= 5) {
      alert("Max 5 visitors allowed");
      return;
    }

    setVisitors([
      ...visitors,
      { name: "", phone: "", email: "", relation: "", photo: null },
    ]);
  };

  // submit
  const handleSubmit = async () => {
    if (!visitType) {
      alert("Select visit type");
      return;
    }

    const formData = new FormData();

    formData.append("visitType", visitType);
    formData.append("purpose", form.purpose);
    formData.append("hostId", form.hostId);

    if (visitType === "professional") {
      formData.append("companyName", form.companyName);
      formData.append("designation", form.designation);
    }

    formData.append("visitors", JSON.stringify(visitors));

    try {
      await createVisit(formData);
      navigate("/visitors");
    } catch (err) {
      console.error("Error creating visit:", err);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">Add Visit</h2>

        {/* Visit Type */}
        <select
          className="w-full p-2 border mb-4"
          value={visitType}
          onChange={(e) => setVisitType(e.target.value as VisitType)}
        >
          <option value="">Select Visit Type</option>
          <option value="informal">Informal</option>
          <option value="professional">Professional</option>
        </select>

        {/* Visitors */}
        {visitors.map((v, i) => (
          <div key={i} className="border p-3 mb-3 rounded">

            <input
              placeholder="Name"
              className="w-full p-2 border mb-2"
              onChange={(e) => handleVisitorChange(i, "name", e.target.value)}
            />

            <input
              placeholder="Phone"
              className="w-full p-2 border mb-2"
              onChange={(e) => handleVisitorChange(i, "phone", e.target.value)}
            />

            <input
              placeholder="Email (optional)"
              className="w-full p-2 border mb-2"
              onChange={(e) => handleVisitorChange(i, "email", e.target.value)}
            />

            {/* Relation ONLY for informal */}
            {visitType === "informal" && (
              <input
                placeholder="Relation"
                className="w-full p-2 border mb-2"
                onChange={(e) =>
                  handleVisitorChange(i, "relation", e.target.value)
                }
              />
            )}

            {/* Photo */}
            <input
              type="file"
              className="w-full"
              onChange={(e) =>
                handleVisitorChange(i, "photo", e.target.files?.[0])
              }
            />
          </div>
        ))}

        {/* Add more */}
        <button
          onClick={addVisitor}
          className="bg-gray-200 px-3 py-1 rounded mb-4"
        >
          + Add Person ({visitors.length}/5)
        </button>

        {/* Professional fields */}
        {visitType === "professional" && (
          <>
            <input
              placeholder="Company Name"
              className="w-full p-2 border mb-2"
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
            />

            <input
              placeholder="Designation"
              className="w-full p-2 border mb-2"
              onChange={(e) =>
                setForm({ ...form, designation: e.target.value })
              }
            />
          </>
        )}

        {/* Common fields */}
        <input
          placeholder="Purpose"
          className="w-full p-2 border mb-2"
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
        />

        <input
          placeholder="Host ID (employeeId)"
          className="w-full p-2 border mb-4"
          onChange={(e) => setForm({ ...form, hostId: e.target.value })}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-black text-white w-full py-2 rounded"
        >
          Submit Request
        </button>

      </div>
    </MainLayout>
  );
};

export default AddVisitor;