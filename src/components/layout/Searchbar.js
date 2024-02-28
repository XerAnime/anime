import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../../context/alert/AlertContext";

const Searchbar = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const AlertContext = useContext(alertContext);

  const onSearch = (e) => {
    setText(e.target.value);
  };

  const searchAnime = (e) => {
    e.preventDefault();
    if (text !== "") {
      navigate(`/list/${text}`);
      setText("");
    } else {
      AlertContext.setAlert("  Please enter an input", "danger");
    }
  };

  return (
    <form className='d-flex' role='search'>
      <input
        className='form-control me-2 text-dark bg-light'
        type='search'
        placeholder='Search anime'
        aria-label='Search'
        onChange={onSearch}
        value={text}
        onKeyDown={(e) => e.key === "Enter" && searchAnime(e)}
      />
      <button className='btn btn-secondary' onClick={searchAnime}>
        Search
      </button>
    </form>
  );
};

export default Searchbar;
