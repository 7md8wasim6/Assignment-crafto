import React from "react";

export const Pagination = ({
  page,
  handleNextPage,
  handlePreviousPage,
  hasMore,
  loading,
}) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      {loading ? (
        <p>loading....</p>
      ) : (
        <>
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">Page {page}</span>
          <button
            onClick={handleNextPage}
            disabled={!hasMore}
            className={`px-4 py-2 rounded-lg ${
              !hasMore
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};
