import React, { useState, useEffect } from "react";
import forge from "node-forge";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../../state/APIContext";
import { useHandleInputChange } from "../service/useHandleInputChange";
import { useHandleSubmit } from "../service/useHandleSubmit";

const LoginForm = () => {
  const { saveToken } = useAPI();
  const navigate = useNavigate(); 
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "Admin",
  });

  const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu/tB9+zU3RxhdeiLXgZF
pql7GpOLzDcbXneQubo5B02iuRIuO2m0bmCYzG2sdqu5bOOG4jieegDr6X75nC26
Sb/wVwH5xP1/EJayL6va1se/Zh+aiYWhWRW82j6meLvxodZoIcV2TGhQoZEHBVQ/
Ta4i1dJr/rtdoha2f8H/YUF+wToTMCaNcqDEbNYQnhj55fLZ0+y+a9o8MQHXP4VB
FcSqyKTKAO+r3vlnxyXezhZtP1jt9Mp5Lg60qHjEpxfnridchQSJUxSBMw87BOC3
hBcrQjEA12pRnkGQCO4tZXyrC0kaRS2edBLj+B4qnmO1u3rzEvMSsJY0jL13ftdS
TQIDAQAB
-----END PUBLIC KEY-----`;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const encryptData = (data) => {
    const publicKey = forge.pki.publicKeyFromPem(rsaPublicKey);
    const encrypted = publicKey.encrypt(data, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  };

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
  
      console.log(dataToSend);
  

  
      const response = await fetch(
        "http://192.168.1.108:5001/admin-server/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const data = await response.json();
  
      if (data.status === "success") {
  const jwe = data.JWE; // Extract JWE
  
  console.log("Token successfully stored in context:", jwe); // Debugging line
  saveToken(jwe);
  alert("Login successful!");
  navigate("/users");
}

      else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.message);
    }
  };
  

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
