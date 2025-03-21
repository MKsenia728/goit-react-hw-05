import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../services/moviesService";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MoviesList from "../../components/MoviesList/MoviesList";
import css from "./Movies.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newParams = new URLSearchParams(searchParams);
    const newQuery = e.target.elements.search.value.trim();
    if (newQuery !== "") {
      newParams.set("query", newQuery);
    } else {
      setMovies([]);
      setError(`Input your query`);
    }
    setSearchParams(newParams);
    e.target.reset();
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoader(true);
        setError("");
        const data = await getMoviesByQuery(query);

        if (data.length === 0 && query !== "") {
          setMovies([]);
          setError(`There are not movies with query: " ${query}"`);
          return;
        }
        setMovies(data);
      } catch {
        setError("Something went wrong, try again");
      } finally {
        setLoader(false);
      }
    };
    getMovie();
  }, [query, searchParams]);

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button className={css.button} type="submit">
          <IoSearchSharp />
        </button>
      </form>

      <Loader loading={loader} />
      {error && <ErrorMessage message={error} />}
      <MoviesList movies={movies} />
    </>
  );
};

export default MoviesPage;
