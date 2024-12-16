import React from "react";

const ForgotPasswordButton = ({ onClick }) => {
  return (
    <div className="text-right">
      <button
        onClick={onClick}
        className="text-sm text-pink-500 hover:underline bg-transparent border-none cursor-pointer"
      >
        Forgot your password?
      </button>
    </div>
  );
};

export default ForgotPasswordButton;
