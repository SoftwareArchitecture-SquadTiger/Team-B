import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchCharities } from "../../Users/services/charity/fetchCharities";

const HaltProjectForm = ({ projectId, projectTitle, charityId, onClose, onUpdate }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    const loadCharities = async () => {
      try {
        const charities = [];
        await fetchCharities((data) => charities.push(...data)); // Fetch charities data
        const selectedCharity = charities.find((c) => c.id === charityId);

        if (!selectedCharity) {
          throw new Error("Charity not found");
        }

        setCharity(selectedCharity);
      } catch (err) {
        console.error("Error fetching charity details:", err.message);
        setError(err.message || "Failed to fetch charity details.");
      }
    };

    loadCharities();
  }, [charityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!charity || !charity.email) {
        throw new Error("Charity email not found.");
      }

      const emailPayload = {
        to: { email: charity.email, name: charity.name },
        projectData: {
          projectId,
          projectTitle,
        },
        reason,
      };

      // Send halt email
      await axios.post(`http://localhost:4000/api/emails/project-halted`, emailPayload);

      // Update project status to "Halted"
      const statusPayload = { status: "Halted" };
      const updateResponse = await axios.put(
        `http://192.168.20.6:5001/client-server/project/update/${projectId}`,
        statusPayload
      );

      if (updateResponse.status === 200) {
        alert("Project halted and email sent successfully!");
        onUpdate(projectId, "Halted"); // Update the table status
        onClose();
      } else {
        throw new Error("Failed to update project status.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message || "Failed to halt project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white shadow rounded w-96">
        <h2 className="text-xl font-bold mb-4">Halt Project</h2>
        {!charity ? (
          <p>Loading charity details...</p>
        ) : (
          <p className="mb-4">
            Halting project <strong>{projectTitle}</strong> for charity{" "}
            <strong>{charity.name}</strong> ({charity.email})
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Reason for Halt</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-red rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-red rounded"
            >
              {loading ? "Halting..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HaltProjectForm;
