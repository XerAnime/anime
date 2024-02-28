import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import animeContext from "../../context/AnimeContext";
import Anime from "./Anime";
import Pagination from "../layout/Pagination";
import Spinner from "../layout/Spinner";

const AnimeList = () => {
  const AnimeContext = useContext(animeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const text = useParams();
  const { loading, animeList, setAnimeList } = AnimeContext;

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = animeList.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setAnimeList(text.id);
    //eslint-disable-next-line
  }, [text]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h4 className='m-2 mt-4'>Results for "{text.id}"</h4>
      <hr />
      <div className='row justify-content-center'>
        {animeList.length > 0 ? (
          currentPosts.map((animes) => (
            <Anime key={animes.id} animes={animes} />
          ))
        ) : (
          <h6 className='fs-5 mt-4 ms-3'>
            No available results for {text.id} ...
          </h6>
        )}
      </div>
      <br />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={animeList.length}
        paginate={paginate}
      />
    </div>
  );
};

export default AnimeList;
