import React, { useState } from "react";
import AvatarUpload from "../components/AvatarUpload";
import FormInput from "../components/FormInput";
import SuccessModal from "../components/SuccessModal";
import { handleCreateCharity } from "../services/charity/handleCreateCharity";
function CharityForm() {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        country: "",
        taxCode: "",
        password: "",
        companyName: "",
        phoneNumber: "",
        type: "Non-Profit",
        address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
        },
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
          await handleCreateCharity(formData, image); // Call the handler function
          setShowSuccessModal(true); // Show success modal on success
        } catch (error) {
          console.error("Error:", error);
          alert("Error creating charity: " + error.message);
        }
      };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 p-6 bg-white shadow rounded">
            <AvatarUpload image={image} handleImageUpload={handleImageUpload} />
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
                id="companyName"
                label="Company Name"
                type="text"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
            />
            
                <label htmlFor="type" className="block mb-1 text-gray-600">
                    Type
                </label>
                <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                    <option value="Non-Profit">Non-Profit</option>
                </select>
            
            <FormInput
                id="taxCode"
                label="Tax Code"
                type="text"
                value={formData.taxCode}
                onChange={handleInputChange}
                placeholder="Enter tax code"
            />
            <FormInput
                id="country"
                label="Country"
                type="text"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Enter country"
            />


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
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-2 bg-pink-500 text-white rounded shadow"
                >
                    Create Charity
                </button>
            </div>
            {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
        </form>
    );
}

export default CharityForm;
