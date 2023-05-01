// components/pagination/Pagination.tsx

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center my-4">
      <button
        className=" bg-blue-500 text-white px-4 py-2 rounded-l-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <div className="border border-blue-500 px-4 py-2">
        {currentPage} de {totalPages}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
