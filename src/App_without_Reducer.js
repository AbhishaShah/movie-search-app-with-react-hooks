import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import Movie from "./components/Movie";

import "./App.css";

const DEFAULT_SEARCH = "Joker";

function App() {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, SetSearch] = useState(DEFAULT_SEARCH);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(null);
    const fetchData = async () => {
      try {
        const response = await axios(
          `https://www.omdbapi.com/?s=${search}&apikey=4a3b711b`
        );
        const data = await response.data;
        if (data.Response === "True") {
          setMovies(data.Search);
          setLoading(false);
        } else {
          setErrorMessage("No data found");
          setLoading(false);
        }
      } catch (e) {
        setErrorMessage(e.Error);
        setLoading(false);
      }
    };
    fetchData();
  }, [search]);

  const handleSearch = search => {
    SetSearch(search);
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
