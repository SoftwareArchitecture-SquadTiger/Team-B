const fetchDonors = async (url, setUsers) => {
    try {
      const response = await fetch(`${url}/admin-server/donors`); // Adjust your API URL
      if (!response.ok) {
        throw new Error("Failed to fetch donors");
      }
      const data = await response.json();
  
      // Transform donor data into required format
      const formattedData = data.data.map((donor) => ({
        id: donor.donor_id,
        name: `${donor.first_name} ${donor.last_name}`,
        role: "DORNOR",
        email: donor.email,
        country: donor.country,
        type: "", // Because donor doesn't have the organization type
      }));
  
      setUsers(formattedData);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };
  
  export default fetchDonors;
  