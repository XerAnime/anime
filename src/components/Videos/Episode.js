import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ReactPlayer from "react-player";
import AnimeContext from "../../context/AnimeContext";

import "./Episode.css";
import { wait } from "@testing-library/user-event/dist/utils";

const Episode = () => {
  const animeContext = useContext(AnimeContext);
  const [videoUrl, setVideoUrl] = useState("");
  const [clicked, setClicked] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const {
    animeInfo,
    getAnime,
    animeEpisodeUrl,
    loading,
    setAnimeEpisode,
    animeEpisodes,
  } = animeContext;

  const { id } = useParams();

  const initInfo = async () => {
    await getAnime(idSlice(id));
    await setAnimeEpisode(id);
  };

  useEffect(() => {
    setVideoUrl("");
    if (!clicked) {
      setVideoUrl("");
      initInfo();
    }
    // eslint-disable-next-line
  }, [id]);

  const epSlice = (ep) => {
    if (ep.number < 9) {
      return ep.id.slice(0, ep.id.length - 10);
    } else if (ep.number > 9) {
      return ep.id.slice(0, ep.id.length - 11);
    } else if (ep.number > 99) {
      return ep.id.slice(0, ep.id.length - 12);
    }
  };

  const idSlice = (id) => {
    if (id.match(/season/g) === null) {
      let number = parseInt(id.replace(/\D/g, ""));
      if (number < 9) {
        return id.slice(0, id.length - 10);
      } else if (number > 9) {
        return id.slice(0, id.length - 11);
      } else if (number > 99) {
        return id.slice(0, id.length - 12);
      }
    } else {
      let removeSeason = id.replace(/-season-\d+/g, "");
      let number = parseInt(removeSeason.replace(/\D/g, ""));
      if (number < 9) {
        return id.slice(0, id.length - 10);
      } else if (number > 9) {
        return id.slice(0, id.length - 11);
      } else if (number > 99) {
        return id.slice(0, id.length - 12);
      }
    }
  };

  const findNextIndex = () => {
    let number = parseInt(id.replace(`${animeInfo.id}-episode-`, ""));
    const index =
      Array.isArray(animeEpisodes) &&
      animeEpisodes.findIndex(
        (episode) => episode.id === `${animeInfo.id}-episode-${number + 1}`
      );

    return index;
  };

  const findPrevIndex = () => {
    let number = parseInt(id.replace(`${animeInfo.id}-episode-`, ""));
    const index =
      Array.isArray(animeEpisodes) &&
      animeEpisodes.findIndex(
        (episode) => episode.id === `${animeInfo.id}-episode-${number - 1}`
      );

    return index;
  };

  const nextep = () => {
    if (findNextIndex() === -1) {
      setToast(true);
      wait(2000).then(() => setToast(false));
    } else {
      navigate(`/episode/${animeEpisodes[findNextIndex()].id}`);
    }
  };

  const prevep = () => {
    if (findPrevIndex() === -1) {
      setToast(true);
      wait(2000).then(() => setToast(false));
    } else {
      navigate(`/episode/${animeEpisodes[findPrevIndex()].id}`);
    }
  };

  const setDefault = () => {
    try {
      let index = "";
      index =
        Array.isArray(animeEpisodeUrl) &&
        animeEpisodeUrl.filter((episode) => episode.quality === "default");
      return index[0].url;
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <div
        className={`d-flex justify-content-between ${
          toast ? alertShow : alertHide
        }`}
        role='alert'
      >
        <p className='mb-0'>No more episodes to go to...</p>
        <button
          className='mb-0'
          style={{ background: "none", border: "none" }}
          onClick={() => setToast(false)}
        >
          <i className='bi bi-x' />
        </button>
      </div>
      <a
        className='me-2 mb-3 h4 text-decoration-none'
        href={`/#/info/${animeInfo.id}`}
      >
        {animeInfo.title} -{" "}
        {"Episode " + id.replace(`${animeInfo.id}-episode-`, "")}
      </a>
      <div className='d-flex justify-content-between align-items-center mt-3'>
        <div className='opacity-75 t-hover' onClick={prevep}>
          <i className='bi bi-caret-left-square me-2 text-light ' />
          <button
            className='me-auto'
            style={{ background: "none", border: "none" }}
          >
            {"Previous Episode "}
          </button>
        </div>
        <div className='opacity-75 t-hover' onClick={nextep}>
          <button
            className='ms-auto'
            style={{ background: "none", border: "none" }}
          >
            {"Next Episode "}
          </button>
          <i className='bi bi-caret-right-square ms-2 text-light' />
        </div>
      </div>
      <ReactPlayer
        className='mt-3 mx-auto'
        url={!loading && videoUrl === "" ? setDefault() : videoUrl}
        controls={true}
        height='100%'
        width='100%'
      />
      <div className='card d-flex flex-row p-2 mt-3 justify-content-center'>
        <div className='dropdown flex-fill text-center'>
          <button
            className='btn dropdown-toggle'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            Episodes
          </button>
          <ul className='dropdown-menu bg-secondary' role='menu'>
            {Array.isArray(animeEpisodes) ? (
              animeEpisodes.map((ep) => (
                <li key={ep.id}>
                  <button
                    className='text-secondary-emphasis dropdown-item li-a'
                    style={{ background: "none" }}
                    onClick={() => {
                      setClicked(true);
                      getAnime(epSlice(ep));
                      setAnimeEpisode(ep.id);
                      navigate(`/episode/${ep.id}`);
                      setClicked(false);
                    }}
                  >
                    {`Episode ${ep.number}`}
                  </button>
                </li>
              ))
            ) : (
              <p>No other episodes</p>
            )}
          </ul>
        </div>
        <div className='vr' />
        <div className='dropdown flex-fill text-center'>
          <button
            className='btn dropdown-toggle'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            Video Quality
          </button>
          <ul className='dropdown-menu bg-secondary' role='menu'>
            {Array.isArray(animeEpisodeUrl) ? (
              loading ? (
                <Spinner />
              ) : (
                animeEpisodeUrl.map((qual) => (
                  <li key={qual.quality}>
                    <button
                      className='text-secondary-emphasis dropdown-item li-a'
                      onClick={() => setVideoUrl(qual.url)}
                      style={{ background: "none" }}
                    >
                      {qual.quality}
                    </button>
                  </li>
                ))
              )
            ) : (
              <p>No other qualities</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const alertHide = "alert alert-warning visually-hidden";
const alertShow = "alert alert-warning";

export default Episode;
