import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../context/alert/AlertContext";

const Home = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const alertContext = useContext(AlertContext);

  const onSearch = (e) => {
    setText(e.target.value);
  };

  const searchAnime = () => {
    if (text === "") {
      alertContext.setAlert("  Please enter an input", "danger");
    } else {
      navigate(`/list/${text}`);
    }
  };

  return (
    <div className='container'>
      <div className='p-5'>
        <h2 className='text-center lh-lg font-monospace fw-bold'>
          AniPlayer - Anime Player Website
        </h2>
        <p className='text-center lh-lg fs-5'>
          Find and discover countless of anime shows to watch!
        </p>
      </div>
      <div className='input-group input-group-lg mx-auto'>
        <input
          className='form-control'
          type='search'
          placeholder='Search anime'
          aria-label='Search'
          onChange={onSearch}
          onKeyDown={(e) => e.key === "Enter" && searchAnime()}
        />
        <button className='input-group-text' onClick={searchAnime}>
          <i className='bi bi-search' />
        </button>
      </div>
    </div>
  );
};

export default Home;
