import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdb";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then(setCast)
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div className={s.castContainer}>
      <ul className={s.movieCast}>
        {cast.map(({ id, name, character, profile_path }) => (
          <li className={s.movieCard} key={id}>
            {profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                alt={name}
                className={s.characterImg}
                onError={(e) => {
                  e.target.src = "https://www.example.com/placeholder.jpg";
                }}
              />
            ) : (
              <img
                className={s.placeholder}
                src="https://via.placeholder.com/500"
                alt={name}
              />
            )}
            <p className={s.characterRole}>
              {name} as {character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
