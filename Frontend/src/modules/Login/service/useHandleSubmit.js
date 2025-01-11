// src/hooks/useHandleSubmit.js
import { useState } from "react";
import { encryptData } from "../hook/encryptData";
import { callLoginApi } from "../hook/callLoginApi";

export const useHandleSubmit = (formData, updateApiData) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const encryptedPassword = encryptData(formData.password);
      const encryptedEmail = encryptData(formData.email);
      const dataToSend = {
        email: encryptedEmail,
        password: encryptedPassword,
        userType: formData.userType,
      };

      // Store dataToSend in the context
      updateApiData(dataToSend);

      const data = await callLoginApi(dataToSend);

      if (data.status === "success") {
        const jwe = data.JWE; // Extract JWE
        
        const { updateAuthToken } = useAPI(); // Function to update the token
        updateAuthToken(jwe);

        alert("Login successful!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.message);
    }
  };

  return { handleSubmit, error };
};
