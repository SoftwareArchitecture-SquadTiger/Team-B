const searchDonors = (donors, searchQuery, selectedRole) => {
  return donors.filter((donor) => {
    const matchesSearch =
    donor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole ? donor.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });
};

export default searchDonors;


