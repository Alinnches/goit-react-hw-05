import React from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!Array.isArray(movies)) {
    return <p>No movies avaliable.</p>;
  }

  return (
    <ul className={s.movieList}>
      {movies.map(({ id, title }) => (
        <li className={s.movieListItem} key={id}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
