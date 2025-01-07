import callDonorsApi from "../../hooks/donor/callDonorsApi";

export const fetchDonors = async (setDonors) => {
  try {
    const { donorsData = []} = await callDonorsApi();

    // Transform donor data
    const formattedDonors = donorsData.map((donor) => ({
      id: donor.donor_id,
      name: `${donor.first_name} ${donor.last_name}`,
      role: "DONOR",
      email: donor.email,
      country: donor.country,
      type: "N/A",
    }));
    // Update the state
    setDonors(formattedDonors);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};