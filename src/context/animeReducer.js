import {
  GET_ANIME,
  CLEAR_URL,
  SET_ANIME_LIST,
  SET_LOADING,
  SET_URL,
  SET_ANIME_EPISODE,
  SET_RECENT_ANIME,
  GET_ANIME_EPISODES,
  CLEAR_ANIME_URL,
} from "./Types";

const animeReducer = (state, action) => {
  switch (action.type) {
    case GET_ANIME:
      return {
        ...state,
        animeInfo: action.payload,
        loading: false,
      };
    case GET_ANIME_EPISODES:
      return {
        ...state,
        animeEpisodes: action.payload,
        loading: false,
      };
    case SET_ANIME_EPISODE:
      return {
        ...state,
        animeEpisodeUrl: action.payload.sources,
        loading: false,
      };
    case SET_ANIME_LIST:
      return {
        ...state,
        animeList: action.payload,
        loading: false,
      };
    case SET_RECENT_ANIME:
      return {
        ...state,
        animeRecent: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_URL:
      return {
        ...state,
        animeUrl: action.payload,
      };
    case CLEAR_URL:
      return {
        ...state,
        animeUrl: [],
      };
    case CLEAR_ANIME_URL:
      return {
        ...state,
        animeEpisodeUrl: [],
      };
    default:
      return state;
  }
};

export default animeReducer;
