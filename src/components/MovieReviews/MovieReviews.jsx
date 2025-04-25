import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api/tmdb";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchMovieReviews(movieId)
      .then((reviewsData) => {
        setReviews(reviewsData);
      })
      .catch((err) => console.error("Error fetching reviews:", err))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <div>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : (
        <ul className={s.reviewsList}>
          {reviews.length > 0 ? (
            reviews.map(({ id, author, content }) => (
              <li className={s.reviewItem} key={id}>
                <h4 className={s.reviewAuthor}>{author}</h4>
                <p className={s.reviewContent}>{content}</p>
              </li>
            ))
          ) : (
            <p>No reviews available for this movie.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
