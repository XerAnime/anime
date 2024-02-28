import React from "react";
import { Link } from "react-router-dom";

const Episodes = ({ episode: { id } }) => {
  return (
    <div className='col-xxl-4 mt-3 li-c'>
      <Link
        className='text-decoration-none li-d text-light opacity-75'
        to={`/episode/${id}`}
      >
        <h6 className='mb-2 mt-2'>{id}</h6>
      </Link>
    </div>
  );
};

export default Episodes;
