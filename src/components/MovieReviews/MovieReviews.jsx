import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getReviewsByMovieId } from "../../services/MoviesService";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const { movieId } = useParams();

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoader(true);
        setError("");
        const data = await getReviewsByMovieId(movieId);
        if (data.length === 0) {
          setError("Wie do not have any reviews for this movie");
          return;
        }
        setReviews(data);
      } catch {
        setError("Something went wrong, try again");
      } finally {
        setLoader(false);
      }
    };
    getReviews();
  }, [movieId]);
  return (
    <>
      <Link to={`/movies/${movieId}`} className={css.link}>
        Back
      </Link>
      <Loader loading={loader} />
      {error && <ErrorMessage message={error} />}
      {reviews.length > 0 && (
        <ul className={css.ul}>
          {reviews.map((el) => (
            <li className={css.li} key={el.id}>
              <h3 className={css.title}> Autor: {el.author}</h3>
              <p>{el.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
