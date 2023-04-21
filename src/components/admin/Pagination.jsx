import React from "react";
import previous from "../../assets/previous.png";
import next from "../../assets/next.png";
import { useEffect } from "react";

function Pagination({ usersPerPage, totalUsers, paginate, currentPage, setCurrentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const moveToNextPage =() => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
  }
  return (
    <div className="w-full flex justify-center">
      <div className="flex my-6">
        <div className="py-3 px-4 border-y-2 border-l-2 rounded-l-lg cursor-pointer flex items-center gap-3">
          <div>
            <img src={previous} alt="<-" />
          </div>
          <span>Previous</span>
        </div>
        {pageNumbers &&
          pageNumbers.map((number, index) => (
            <div
              key={index}
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? "bg-gray-300 text-gray-700"
                  : "text-gray-800"
              } py-3 px-4 border-y-2 border-l-2 cursor-pointer text-sm`}
            >
              {number}
            </div>
          ))}
        <div className="py-3 px-4 border-2 rounded-r-lg cursor-pointer flex flex-row-reverse items-center gap-3" onClick={moveToNextPage}>
          <div>
            <img src={next} alt="->" />
          </div>
          <span>Next</span>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
