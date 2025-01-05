import { callUsersAPI } from "../hooks/callUsersAPI";

export const fetchUsers = async (url, setUsers) => {
  try {
    const { donorsData, charitiesData } = await callUsersAPI(url);

    // Transform donor data
    const formattedDonors = donorsData.map((donor) => ({
      id: donor.donor_id,
      name: `${donor.first_name} ${donor.last_name}`,
      role: "DONOR",
      email: donor.email,
      country: donor.country,
      type: "", // Donors don't have types
    }));

    // Transform charity data
    const formattedCharities = charitiesData.map((charity) => ({
      id: charity.charity_id,
      name: charity.name,
      type: charity.type,
      email: charity.email,
      country: charity.country,
      role: "CHARITY"
    }));

    // Combine data and update the state
    setUsers([...formattedDonors, ...formattedCharities]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};
export default fetchUsers;