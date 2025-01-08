import { createCharityApi } from "../../hooks/charity/callCreateCharityApi";

export const handleCreateCharity = async (formData, image) => {
  const payload = {
    name: formData.companyName,
    email: formData.email,
    phone: formData.phoneNumber,
    type: formData.type,
    password: formData.password,
    address: {
      street: formData.address.street,
      city: formData.address.city,
      state: formData.address.state,
      zip: formData.address.postalCode, // Adjusted for backend naming convention
    },
    country: formData.country,
    tax_code: formData.taxCode,
    img_url: image || "",
  };

  try {
    const response = await createCharityApi(payload); // Call the API
    return response; // Return response for success handling
  } catch (error) {
    throw error; // Propagate error for UI handling
  }
};
