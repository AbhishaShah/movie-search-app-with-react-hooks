import React, {useReducer, useEffect} from "react";
import axios from "axios";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import Movie from "./components/Movie";

import "./App.css";

const DEFAULT_SEARCH = "Joker";

const initialState = {
  loading: true,
  movies: [],
  search: DEFAULT_SEARCH,
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIE_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };

    case "SEARCH_MOVIE_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: null,
        movies: action.payload,
      };

    case "SEARCH_MOVIE_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };

    case "SET_SEARCH":
      return {
        ...state,
        loading: true,
        search: action.search,
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {movies, loading, errorMessage, search} = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `https://www.omdbapi.com/?s=${search}&apikey=4a3b711b`
        );
        const data = await response.data;
        if (data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIE_SUCCESS",
            payload: data.Search,
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIE_ERROR",
            error: "No data found",
          });
        }
      } catch (e) {
        dispatch({
          type: "SEARCH_MOVIE_ERROR",
          error: e.error,
        });
      }
    };
    fetchData();
  }, [search]);

  const handleSearch = searchVal => {
    dispatch({
      type: "SET_SEARCH",
      search: searchVal,
    });
  };

  return (
    <div className="App">
      <Header title="Movie Search App With React Hooks" />
      <SearchBox
        search={handleSearch}
        placeholder={`Search by name (ex:${DEFAULT_SEARCH})`}
      />
      <div className="movie-container">
        {loading && !errorMessage ? (
          <span className="text-center">Loading...</span>
        ) : errorMessage ? (
          <div className="error-message text-center">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
