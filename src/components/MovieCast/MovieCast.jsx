import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCastByMovieId } from "../../services/moviesService";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      try {
        setLoader(true);
        setError("");
        const data = await getCastByMovieId(movieId);
        if (data.length === 0) {
          setError("The movie has not information about cast");
          return;
        }
        setCast(data);
      } catch {
        setError("Something went wrong, try again");
      } finally {
        setLoader(false);
      }
    };
    getCast();
  }, [movieId]);
  return (
    <>
      <Link to={`/movies/${movieId}`} className={css.link}>
        Back
      </Link>
      <Loader loading={loader} />
      {error && <ErrorMessage message={error} />}
      {cast.length > 0 && (
        <ul className={css.ul}>
          {cast.map((el) => (
            <li className={css.li} key={el.cast_id}>
              <div className={css.photo}>
                <img
                  src={`${IMAGE_PATH}${el.profile_path}`}
                  alt={el.name}
                  height="300"
                />
              </div>
              <p>{el.name}</p>
              <p>Character: {el.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
