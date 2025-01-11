import React from "react";
import { useAPI } from "../../../state/APIContext";
import { useHandleInputChange } from "../service/useHandleInputChange";
import { useHandleSubmit } from "../service/useHandleSubmit";

const LoginForm = () => {
  const { updateApiData } = useAPI(); // Get the context function

  const { formData, handleInputChange } = useHandleInputChange({
    email: "",
    password: "",
    userType: "Admin",
  });

  const { handleSubmit, error } = useHandleSubmit(formData, updateApiData);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded grid gap-4"
    >
      <h2 className="text-xl font-bold text-gray-700 text-center">Login</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="text"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 py-1 bg-pink-500 text-white rounded shadow hover:bg-pink-600 text-sm"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
