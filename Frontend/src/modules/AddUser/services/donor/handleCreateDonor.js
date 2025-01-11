import { createDonorApi } from "../../hooks/donor/callCreateDonorApi";

export const handleCreateDonor = async (formData, image) => {
  const payload = {
    address: {
      street: formData.address.street,
      city: formData.address.city,
      state: formData.address.state,
      postal_code: formData.address.postalCode, // Corrected key
    },
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phoneNumber,
    password: formData.password,
    country: formData.country,
    img_url: image || "",
  };

  try {
    const response = await createDonorApi(payload); // Call the API
    return response; // Return response for success handling
  } catch (error) {
    throw error; // Propagate error for UI handling
  }
};
