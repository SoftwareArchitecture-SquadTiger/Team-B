import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';

function AddCharityForm() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    country: 'Vietnam',
    taxCode: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phoneNumber: '',
    type: 'Individual',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userType, setUserType] = useState('Charity User');

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

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be at least 10 digits and contain only numbers';
    }

    // Required fields
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.taxCode) newErrors.taxCode = 'Tax code is required';
    if (!formData.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setShowSuccessModal(true); // Show success modal if validation passes
    }
  };

  // Close the success modal
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        {/* Dropdown for User Type */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="text-lg font-semibold text-gray-800 bg-transparent border-none focus:outline-none"
            >
              <option value="Charity User">Charity User</option>
              <option value="Donor User">Donor User</option>
            </select>
          </div>
        </div>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Avatar Upload */}
          <div className="col-span-2 flex flex-col items-center">
            <label
              htmlFor="avatar"
              className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer bg-gray-100"
            >
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <FaImage className="text-gray-400 text-3xl" />
              )}
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            >
              <option>Vietnam</option>
              <option>USA</option>
              <option>Germany</option>
            </select>
          </div>

          {/* Tax Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="taxCode">
              Tax Code
            </label>
            <input
              id="taxCode"
              type="text"
              value={formData.taxCode}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter tax code"
            />
            {errors.taxCode && <p className="text-red-500 text-sm">{errors.taxCode}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
              Password Confirmation
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="companyName">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter company name"
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter address"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-pink-500 text-white rounded-md shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Create account
            </button>
          </div>
        </form>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-medium text-gray-800">Account successfully created!</h3>
              <button
                onClick={handleCloseModal}
                className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md shadow hover:bg-pink-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCharityForm;
