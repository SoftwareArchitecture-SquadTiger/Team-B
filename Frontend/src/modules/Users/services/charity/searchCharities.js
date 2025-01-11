const searchCharities = (charities, searchQuery, selectedRole) => {
    return charities.filter((charity) => {
      const matchesSearch =
      charity.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = selectedRole ? charity.role === selectedRole : true;
      return matchesSearch && matchesRole;
    });
  };
  
  export default searchCharities;
  