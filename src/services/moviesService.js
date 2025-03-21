import axios from 'axios';
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  params: {
    language: "en-US",
    api_key: "8b1ce4cb0b1c9f733f0a0b8033e6638f"
  },
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjFjZTRjYjBiMWM5ZjczM2YwYTBiODAzM2U2NjM4ZiIsIm5iZiI6MTc0MjMxNzMzNy44ODk5OTk5LCJzdWIiOiI2N2Q5YTcxOThkMzEyYzU1NjliYjRiNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ffhMyOiqX82AIPKM4sbC0n0YHVeV12yIjEujUZBaAbg'
  }
};

export const getAllMovies = async () => {
  const resp = await axios.get("trending/movie/day", options);
  return resp.data.results;
}

export const getMovieById = async (id) => {
  const resp = await axios.get(`movie/${id}`, options);
  return resp.data;
}

export const getCastByMovieId = async (id) => {
  const resp = await axios.get(`movie/${id}/credits`, options);
  return resp.data.cast;
}

export const getReviewsByMovieId = async (id) => {
  const resp = await axios.get(`movie/${id}/reviews`, options);
  return resp.data.results;
}

export const getMoviesByQuery = async (query) => {
  const newOptions = {
    ...options,
    params: {
      ...options.params,
      query: query 
    }
  };
  const resp = await axios.get('search/movie', newOptions);
  return resp.data.results;
}