import axios from "axios";

const API_KEY = "a164f3094888a91f2649f24223b56f40";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTY0ZjMwOTQ4ODhhOTFmMjY0OWYyNDIyM2I1NmY0MCIsIm5iZiI6MTc0NTIyNjI2OC4yNDE5OTk5LCJzdWIiOiI2ODA2MGExYzZlMWE3NjllODFlZTQ3NjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ecp6Ydpp9JmNRo8nKhPyniH8aZZRLTbm5GCHiVL7ceA";

export const tmdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await tmdbAPI.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await tmdbAPI.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en",
      page: 1,
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await tmdbAPI.get(`/movie/${movieId}`, {
    params: {
      language: "en",
    },
  });
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await tmdbAPI.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error("Помилка при отриманні акторів:", error);
    return [];
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await tmdbAPI.get(`/movie/${movieId}/reviews`);
    console.log("API Response:", response.data);
    return response.data.results;
  } catch (error) {
    console.error("Помилка при отриманні відгуків:", error);
    return [];
  }
};
