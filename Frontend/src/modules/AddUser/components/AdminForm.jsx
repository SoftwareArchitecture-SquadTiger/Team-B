import React, { useState } from "react";
import forge from "node-forge";
import FormInput from "../components/FormInput";
import SuccessModal from "../components/SuccessModal";
import { handleCreateAdmin } from "../services/admin/handleCreateAdmin";
import { useNavigate } from "react-router-dom";

function AdminForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType:"Admin",
    email: "",
    password: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // RSA Public Key
  const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu/tB9+zU3RxhdeiLXgZF
pql7GpOLzDcbXneQubo5B02iuRIuO2m0bmCYzG2sdqu5bOOG4jieegDr6X75nC26
Sb/wVwH5xP1/EJayL6va1se/Zh+aiYWhWRW82j6meLvxodZoIcV2TGhQoZEHBVQ/
Ta4i1dJr/rtdoha2f8H/YUF+wToTMCaNcqDEbNYQnhj55fLZ0+y+a9o8MQHXP4VB
FcSqyKTKAO+r3vlnxyXezhZtP1jt9Mp5Lg60qHjEpxfnridchQSJUxSBMw87BOC3
hBcrQjEA12pRnkGQCO4tZXyrC0kaRS2edBLj+B4qnmO1u3rzEvMSsJY0jL13ftdS
TQIDAQAB
-----END PUBLIC KEY-----`;

  // Encrypt data using the public key
  const encryptData = (data) => {
    const publicKey = forge.pki.publicKeyFromPem(rsaPublicKey);
    const encrypted = publicKey.encrypt(data, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  };

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
      // Encrypt email and password
      const encryptedEmail = encryptData(formData.email);
      const encryptedPassword = encryptData(formData.password);
      const userType = formData.userType;
    
      // Create a new payload with encrypted data
      const encryptedData = {
        userType: userType,
        email: encryptedEmail,
        password: encryptedPassword,
      };
console.log(encryptedEmail);
console.log(encryptedPassword)
      await handleCreateAdmin(encryptedData); // Call the handler function with encrypted data
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
