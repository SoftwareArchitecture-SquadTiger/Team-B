import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ }) => {

  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/users");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h3 className="text-lg font-medium text-gray-800">Account successfully created!</h3>
        <button
          onClick={handleReturn}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md shadow hover:bg-pink-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
