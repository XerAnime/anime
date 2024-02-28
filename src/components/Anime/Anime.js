import React from "react";
import { Link } from "react-router-dom";

const Anime = ({ animes: { id, title, image, episodeNumber } }) => {
  return (
    <div
      className='m-1 overflow-hidden a-card'
      style={{ width: "260px", height: "420px" }}
    >
      <Link to={`/info/${id}`} className='text-decoration-none'>
        <img src={image} style={imageStyle} alt={id} className='mb-1 m-3' />
        <p className='text-center text-light mb-0'>{title}</p>
        {episodeNumber && (
          <p className='text-light opacity-75 text-center'>
            Episode: {episodeNumber}
          </p>
        )}
      </Link>
    </div>
  );
};

const imageStyle = {
  height: "300px",
  width: "200px",
};

export default Anime;
