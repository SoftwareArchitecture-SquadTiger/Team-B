const filterUsers = (users, searchQuery, selectedRole) => {
    return users.filter((user) => {
      const matchesSearch =
        user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = selectedRole ? user.role === selectedRole : true;
      return matchesSearch && matchesRole;
    });
  };
  
  export default filterUsers;
  