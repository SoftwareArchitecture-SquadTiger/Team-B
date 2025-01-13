import React, { useState } from "react";
import FormInput from "../components/FormInput";
import SuccessModal from "../components/SuccessModal";
import { handleCreateAdmin } from "../services/admin/handleCreateAdmin";
import { useNavigate } from "react-router-dom";

function AdminForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value, // Directly update the corresponding field
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await handleCreateAdmin(formData); // Call the handler function
            setShowSuccessModal(true); // Show success modal on success
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating admin: " + error.message);
        }
    };
    const handleReturn = () => {
        navigate("/users");
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 p-6 bg-white shadow rounded">
            <FormInput
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
            />
            <FormInput
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
            />
            
            <div className="flex justify-between items-center mt-6">

                <button
                    type="button"
                    onClick={handleReturn}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                    Return
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-pink-500 text-white rounded shadow"
                >
                    Create Admin
                </button>
            </div>
            {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
        </form>
    );
}

export default AdminForm;
