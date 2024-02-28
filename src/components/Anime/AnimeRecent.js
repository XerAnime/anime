import React, { useState, useContext, useEffect } from "react";
import Anime from "./Anime";
import Spinner from "../layout/Spinner";
import Pagination from "../layout/Pagination";
import animeContext from "../../context/AnimeContext";

const AnimeRecent = () => {
  const AnimeContext = useContext(animeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const { loading, animeRecent, setRecentAnime } = AnimeContext;

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = animeRecent.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setRecentAnime();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h4 className='m-2 mt-4'>Recent Episode</h4>
      <hr />
      <div className='row justify-content-center'>
        {currentPosts.map((animes) => (
          <Anime key={animes.id} animes={animes} />
        ))}
      </div>
      <br />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={animeRecent.length}
        paginate={paginate}
      />
    </div>
  );
};

export default AnimeRecent;
