import { callUsersAPI } from "../hooks/callUsersAPI";

export const fetchUsers = async (url, setDonors, setCharities) => {
  try {
    const { donorsData = [], charitiesData = [] } = await callUsersAPI(url);

    // Transform donor data
    const formattedDonors = donorsData.map((donor) => ({
      name: `${donor.first_name} ${donor.last_name}`,
      role: "DONOR",
      email: donor.email,
      country: donor.country,
      type: "",
    }));

    // Transform charity data
    const formattedCharities = charitiesData.map((charity) => ({
      name: charity.name,
      type: charity.type,
      email: charity.email,
      country: charity.country,
      role: "CHARITY",
    }));

    // Update the state
    setDonors(formattedDonors);
    setCharities(formattedCharities);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};
