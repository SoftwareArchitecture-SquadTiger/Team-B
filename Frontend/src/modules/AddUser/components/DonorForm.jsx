import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import SuccessModal from "../components/SuccessModal";
import AvatarUpload from "../components/AvatarUpload";
import { handleCreateDonor } from "../services/donor/handleCreateDonor";

function DonorForm() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    country: "",
  });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleCreateDonor(formData, image); 
      setShowSuccessModal(true); 
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating donor: " + error.message);
    }
  };

  const handleReturn = () => {
    navigate("/users"); 
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-6 bg-white shadow rounded">
      <AvatarUpload image={image} handleImageUpload={handleImageUpload} />

      <div className="grid grid-cols-2 gap-4">
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
        <FormInput
          id="phoneNumber"
          label="Phone Number"
          type="text"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter phone number"
        />
        <FormInput
          id="firstName"
          label="First Name"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter first name"
        />
        <FormInput
          id="lastName"
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter last name"
        />
        <FormInput
          id="country"
          label="Country"
          type="text"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Enter country"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          id="address-street"
          label="Street"
          type="text"
          value={formData.address.street}
          onChange={handleInputChange}
          placeholder="Enter street"
        />
        <FormInput
          id="address-city"
          label="City"
          type="text"
          value={formData.address.city}
          onChange={handleInputChange}
          placeholder="Enter city"
        />
        <FormInput
          id="address-state"
          label="State"
          type="text"
          value={formData.address.state}
          onChange={handleInputChange}
          placeholder="Enter state"
        />
        <FormInput
          id="address-postalCode"
          label="Postal Code"
          type="text"
          value={formData.address.postalCode}
          onChange={handleInputChange}
          placeholder="Enter postal code"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={handleReturn} // Call the return handler
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Return
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600"
        >
          Create Donor
        </button>
      </div>

      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </form>
  );
}

export default DonorForm;
