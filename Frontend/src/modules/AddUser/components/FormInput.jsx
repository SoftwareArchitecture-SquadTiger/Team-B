import React from "react";

const FormInput = ({ id, label, type, value, onChange, placeholder, error }) => {
  return (
    <div>
      <label className="block mb-1 text-gray-600" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
