import React, { useState } from "react";
import AvatarUpload from "../components/AvatarUpload";
import FormInput from "../components/FormInput";
import UserTypeSelector from "../components/UserTypeSelector";
import SuccessModal from "../components/SuccessModal";

function AddCharityForm() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    taxCode: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });
  const [userType, setUserType] = useState("Charity User");
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id.startsWith("address-")) {
      const key = id.split("-")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [key]: value },
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <UserTypeSelector
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        />
        <AvatarUpload image={image} handleImageUpload={handleImageUpload} />
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email"
          className="mb-4"
        />
        <FormInput
          id="country"
          label="Country"
          type="text"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Enter country"
          className="mb-4"
        />
        {userType === "Charity User" && (
          <FormInput
            id="taxCode"
            label="Tax Code"
            type="text"
            value={formData.taxCode}
            onChange={handleInputChange}
            placeholder="Enter tax code"
            className="mb-4"
          />
        )}
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter password"
          className="mb-4"
        />
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm password"
          className="mb-4"
        />
        <FormInput
          id="companyName"
          label="Company Name"
          type="text"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter company name"
          className="mb-4"
        />
        <FormInput
          id="phoneNumber"
          label="Phone Number"
          type="text"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter phone number"
          className="mb-4"
        />
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Address</label>
          <input
            id="address-street"
            type="text"
            value={formData.address.street}
            onChange={handleInputChange}
            placeholder="Street"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            id="address-city"
            type="text"
            value={formData.address.city}
            onChange={handleInputChange}
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            id="address-state"
            type="text"
            value={formData.address.state}
            onChange={handleInputChange}
            placeholder="State"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            id="address-postalCode"
            type="text"
            value={formData.address.postalCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-400"
          >
            Return
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600"
          >
            Create Account
          </button>
        </div>
      </form>
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>
  );
}

export default AddCharityForm;
