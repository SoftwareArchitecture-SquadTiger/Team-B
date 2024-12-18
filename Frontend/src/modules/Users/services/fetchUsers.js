const fetchUsers = async (url, setUsers) => {
    try {
      // Fetch donors and charities simultaneously
      const [donorsResponse, charitiesResponse] = await Promise.all([
        fetch(`${url}/admin-server/donors`),
        fetch(`${url}/admin-server/charities`),
      ]);
  
      // Check if responses are OK
      if (!donorsResponse.ok) {
        throw new Error("Failed to fetch donors");
      }
      if (!charitiesResponse.ok) {
        throw new Error("Failed to fetch charities");
      }
  
      // Parse JSON responses
      const donorsData = await donorsResponse.json();
      const charitiesData = await charitiesResponse.json();
  
      // Transform donor data
      const formattedDonors = donorsData.data.map((donor) => ({
        id: donor.donor_id,
        name: `${donor.first_name} ${donor.last_name}`,
        role: "DONOR",
        email: donor.email,
        country: donor.country,
        type: "", // Donors don't have types
      }));
  
      // Transform charity data
      const formattedCharities = charitiesData.data.map((charity) => ({
        id: charity.charity_id,
        name: charity.name,
        role: "CHARITY",
        email: charity.email,
        country: charity.country,
        type: charity.type, // Organization type
      }));
  
      // Combine and set users
      setUsers([...formattedDonors, ...formattedCharities]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  export default fetchUsers;