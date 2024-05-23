import React from "react";
import Button from "./Button";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="pagination">
      <Button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
        label="Previous"
        disabled={currentPage === 0}
      />
      <span>
        Page {currentPage + 1} of {totalPages}
      </span>
      <Button
        onClick={() =>
          setCurrentPage(Math.min(currentPage + 1, totalPages - 1))
        }
        label="Next"
        disabled={currentPage === totalPages - 1}
      />
    </div>
  );
};

export default Pagination;
