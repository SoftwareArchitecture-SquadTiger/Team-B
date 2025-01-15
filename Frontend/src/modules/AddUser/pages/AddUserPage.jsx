import React, { useState } from "react";
import CharityForm from "../components/CharityForm";
import DonorForm from "../components/DonorForm";
import AdminForm from "../components/AdminForm";

function AddUserPage() {
  const [formType, setFormType] = useState("Charity");

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add New {formType}
      </h2>
      <div className="mb-4">
        <select
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
          className="w-min p-2 border border-gray-300 rounded"
        >
          <option value="Charity">Charity</option>
          <option value="Donor">Donor</option>
          <option value="Admin">Admin</option>

        </select>
      </div>
      {formType === "Charity" && <CharityForm />}
      {formType === "Donor" && <DonorForm />}
      {formType === "Admin" && <AdminForm />}
    </div>
  );
}

export default AddUserPage;