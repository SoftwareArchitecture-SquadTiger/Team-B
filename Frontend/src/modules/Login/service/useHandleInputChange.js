// src/hooks/useHandleInputChange.js
import { useState } from "react";

export const useHandleInputChange = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return { formData, setFormData, handleInputChange };
};
