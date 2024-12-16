import React from "react";

const SubmitButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
