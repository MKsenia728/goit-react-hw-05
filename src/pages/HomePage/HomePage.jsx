import { useEffect, useState } from "react";
import { getAllMovies } from "../../services/moviesService";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MoviesList from "../../components/MoviesList/MoviesList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setLoader(true);
        setError(false);
        const data = await getAllMovies();
        if (data.length === 0) {
          setError(true);
          return;
        }
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getMovies();
  }, []);
  return (
    <div>
      <h1>Trending today</h1>
      <Loader loading={loader} />
      {error && <ErrorMessage message="Something went wrong, try again" />}
      <MoviesList movies={movies} />
    </div>
  );
};

export default HomePage;
