import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getMovieById } from "../../services/MoviesService";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieDetail from "../../components/MovieDetail/MovieDetail";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state);

  useEffect(() => {
    async function getMovie() {
      try {
        setLoader(true);
        setError("");
        const data = await getMovieById(movieId);
        if (data === null) {
          setError("The movie has not detail");
          return;
        }
        setMovie(data);
      } catch {
        setError("Something went wrong, try again");
      } finally {
        setLoader(false);
      }
    }
    getMovie();
  }, [movieId]);
  return (
    <>
      <Link to={backLink.current ?? "/movies"}>Go back</Link>
      <Loader loading={loader} />
      {error && <ErrorMessage message={error} />}
      {movie && <MovieDetail movie={movie} />}
    </>
  );
};

export default MovieDetailsPage;
