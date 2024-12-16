import React from "react";

const FormButtons = ({ onReturn, onSubmit }) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        type="button"
        onClick={onReturn}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
      >
        Return
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        Create Project
      </button>
    </div>
  );
};

export default FormButtons;
