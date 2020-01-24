import React from "react";
import default_poster from "../Image-Coming-Soon.png";

const Movie = ({movie}) => {
  const movie_poster = movie.Poster === "N/A" ? default_poster : movie.Poster;
  return (
    <div className="movie">
      <h3 className="movie-title">{movie.Title}</h3>
      <img
        className="movie-poster"
        width="250"
        height="300"
        src={movie_poster}
        alt={`Movie Title: ${movie.Title}`}
      />
      <h4>({movie.Year})</h4>
    </div>
  );
};

export default Movie;
