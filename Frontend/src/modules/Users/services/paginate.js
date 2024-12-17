const paginate = (items, currentPage, itemsPerPage) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
  
    const paginatedItems = items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    return { paginatedItems, totalPages };
  };
  
  export default paginate;
  