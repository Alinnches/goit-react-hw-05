import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("query") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  useEffect(() => {
    if (query) {
      searchMovies(query).then((moviesData) => {
        setMovies(moviesData);
        localStorage.setItem("movies", JSON.stringify(moviesData));
      });
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (value) {
      setSearchParams({ query: value });
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, {
      state: { movies, query },
    });
  };

  return (
    <div>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          name="query"
          defaultValue={query}
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default MoviesPage;
