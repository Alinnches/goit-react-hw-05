import React from "react";
import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading movie details...</p>;

  const { title, overview, genres, poster_path, vote_average } = movie;

  const backLink = location.state?.from || "/";

  return (
    <div>
      <button className={s.btn} onClick={() => navigate(backLink)}>
        Go back
      </button>
      <div className={s.movieContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className={s.movieImg}
        />
        <div className={s.movieInfo}>
          <h2 className={s.movieTitle}>{title}</h2>
          <p className={s.movieRate}>
            User score: {vote_average ? (vote_average * 10).toFixed(0) : "N/A"}%
          </p>
          <h3 className={s.movieOvrw}>Overview</h3>
          <p className={s.descr}>{overview}</p>
          <h3 className={s.movieGenre}>Genres</h3>
          <p className={s.genres}>{genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>
      <hr />
      <ul className={s.list}>
        <li className={s.listItem}>
          <Link to="cast">Cast</Link>
        </li>
        <li className={s.listItem}>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
