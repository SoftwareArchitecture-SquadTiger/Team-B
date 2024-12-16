import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2 py-1 border border-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`px-2 py-1 border border-gray-300 rounded ${
            currentPage === page ? "bg-pink-500 text-white" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 py-1 border border-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
