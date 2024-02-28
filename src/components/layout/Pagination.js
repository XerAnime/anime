import React, { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [page, setPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (num) => {
    paginate(num);
    setPage(num);
  };

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination justify-content-center'>
        <li className={page === 1 ? "page-item disabled" : "page-item"}>
          <button
            className='page-link'
            onClick={() => changePage(page - 1)}
            aria-label='Previous'
          >
            <span aria-hidden='true'>&laquo;</span>
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <button onClick={() => changePage(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
        <li
          className={
            page === Math.ceil(totalPosts / postsPerPage)
              ? "page-item disabled"
              : "page-item"
          }
        >
          <button
            className='page-link'
            onClick={() => changePage(page + 1)}
            aria-label='Next'
          >
            <span aria-hidden='true'>&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
