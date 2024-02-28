import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Episodes from "../Videos/Episodes";
import Spinner from "../layout/Spinner";
import AnimeContext from "../../context/AnimeContext";

const AnimeInfo = () => {
  const animeContext = useContext(AnimeContext);

  const { loading, animeInfo, animeEpisodes, getAnime } = animeContext;

  const { id } = useParams();

  useEffect(() => {
    getAnime(id);
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-xxl-3 clearfix'>
            <img
              src={animeInfo.image}
              className='mx-auto d-block m-4'
              style={imageStyle}
              alt='anime_image'
            ></img>
            <div className='mb-2'>
              <p className='mb-0'>
                <span className='fw-semibold'>Release Date:</span>{" "}
                {animeInfo.releaseDate}
              </p>
              <p className='mb-0'>
                <span className='fw-semibold'>Status:</span> {animeInfo.status}
              </p>
              <p>
                <span className='fw-semibold'>Genre:</span>{" "}
                {Array.isArray(animeInfo.genres) && animeInfo.genres.length > 1
                  ? animeInfo.genres.map((genre) => genre + ", ")
                  : animeInfo.genres}
              </p>
            </div>
          </div>
          <div className='col-xxl-9'>
            <br />
            <h4>{animeInfo.title}</h4>
            <h6 className='mt-3 opacity-75'>{animeInfo.otherName}</h6>
            <br />
            <p>{animeInfo.description}</p>
          </div>
        </div>
      </div>
      <div className='container'>
        <hr />
        <h5>Episodes</h5>
        <div className='mt-3 row'>
          {Array.isArray(animeEpisodes) ? (
            animeEpisodes.map((episode) => (
              <Episodes key={episode.number} episode={episode} />
            ))
          ) : (
            <p>No Episodes Available...</p>
          )}
        </div>
      </div>
    </div>
  );
};

const imageStyle = {
  height: "300px",
  width: "200px",
};

export default AnimeInfo;
