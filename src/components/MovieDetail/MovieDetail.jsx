import { NavLink, Outlet } from "react-router-dom";
import css from "./MovieDetail.module.css";
import clsx from "clsx";

const getStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const MovieDetail = ({ movie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";
  return (
    <div>
      <div className={css.container}>
        <div>
          <img
            src={`${IMAGE_PATH}${movie.backdrop_path}`}
            alt={movie.title}
            height="300"
          />
        </div>
        <div className={css.info}>
          <h1>{movie.title}</h1>
          <p>User score: {(movie.vote_average * 10).toFixed(0)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <div>
            {movie.genres.map((genre, idx) => (
              <span key={idx} className={css.span}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={css.addInfo}>
        <p>Addition information</p>
        <ul>
          <li>
            <NavLink to="cast" className={getStyles}>
              cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={getStyles}>
              reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetail;
