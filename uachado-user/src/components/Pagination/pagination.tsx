import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const getPaginationGroup = () => {
    let start: number;
    let end: number;

    if (totalPages <= 6) {
      // If total pages is 6 or less, show all pages
      start = 1;
      end = totalPages;
    } else {
      // More than 6 pages
      if (currentPage <= 4) {
        // For the first 4 pages
        start = 1;
        end = 5;
      } else if (currentPage + 2 >= totalPages) {
        // For the last 4 pages
        start = totalPages - 4;
        end = totalPages;
      } else {
        // For all other pages
        start = currentPage - 2;
        end = currentPage + 2;
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        className="btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {getPaginationGroup().map((page) => (
        <button
          key={page}
          className={`btn btn-sm ${
            currentPage === page
              ? "btn-accent"
              : "btn-outline btn-outline-accent"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
