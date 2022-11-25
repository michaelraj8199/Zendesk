import React from "react";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
      <>
        <ul className="pagination">
          {/* <li className="previousBtn">Previous</li> */}
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
          {/* <li className="nextBtn">Next</li> */}
        </ul>
      </>
    );
};

export default Pagination;
