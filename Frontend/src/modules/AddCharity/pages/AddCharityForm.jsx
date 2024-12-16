import React, { useState } from "react";
import AvatarUpload from "./AvatarUpload";
import FormInput from "./FormInput";
import CountrySelector from "./CountrySelector";
import UserTypeSelector from "./UserTypeSelector";
import SuccessModal from "./SuccessModal";

function AddCharityForm() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    country: "Vietnam",
    taxCode: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userType, setUserType] = useState("Charity User");

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  // Handle form data change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits and contain only numbers";
    }

    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.taxCode) newErrors.taxCode = "Tax code is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <UserTypeSelector value={userType} onChange={(e) => setUserType(e.target.value)} />

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <AvatarUpload image={image} handleImageUpload={handleImageUpload} />
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            error={errors.email}
          />
          <CountrySelector id="country" value={formData.country} onChange={handleInputChange} />
          <FormInput
            id="taxCode"
            label="Tax Code"
            type="text"
            value={formData.taxCode}
            onChange={handleInputChange}
            placeholder="Enter tax code"
            error={errors.taxCode}
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            error={errors.password}
          />
          <FormInput
            id="confirmPassword"
            label="Password Confirmation"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
          />
          <FormInput
            id="companyName"
            label="Company Name"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Enter company name"
            error={errors.companyName}
          />
          <FormInput
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            error={errors.phoneNumber}
          />
          <FormInput
            id="address"
            label="Address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            error={errors.address}
          />
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-pink-500 text-white rounded-md shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Create account
            </button>
          </div>
        </form>

        {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
      </div>
    </div>
  );
}

export default AddCharityForm;
