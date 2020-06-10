import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Discover as DiscoverView, MovieThumb } from "../../View";
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import {
  fetchMovies,
  fetchMoreMovies,
  moviesSelector,
} from "../features/getMovies";
import { changeRating, ratingSelector } from "../features/rating";
import {
  fetchQueried,
  fetchMoreQueried,
  searchSelector,
} from "../features/search";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isQuery, setIsQuery] = useState(false);
  const dispatch = useDispatch();
  const {
    loading,
    hasErrors,
    movies,
    heroImage,
    currentPage,
    totalPages,
  } = useSelector(moviesSelector);
  const { current } = useSelector(ratingSelector);
  const {
    qLoading,
    qHasErrors,
    qMovies,
    qCurrentPage,
    qTotalPages,
  } = useSelector(searchSelector);

  const prevMoviesRef = useRef(movies);
  useEffect(() => {
    if(searchTerm === '' && prevMoviesRef.current.length === 0 && movies.length === 0) {
      dispatch(fetchMovies())
    };
    prevMoviesRef.current = movies;
  }, [dispatch, searchTerm, movies]);

  const loadMoreItems = () =>
    dispatch(
      isQuery
        ? fetchMoreQueried(
            `${API_URL}search/movie?api_key=${API_KEY}`,
            searchTerm,
            qCurrentPage + 1
          )
        : fetchMoreMovies(
            `${API_URL}movie/popular?api_key=${API_KEY}`,
            currentPage + 1
          )
    );

  const selectStar = (star) => dispatch(changeRating(star * 2));

  const searchItems = (query) => {
    setSearchTerm(query);

    if (searchTerm) {
      setIsQuery(true);
      dispatch(
        fetchQueried(`${API_URL}search/movie?api_key=${API_KEY}`, searchTerm)
      );
    }
  };

  return (
    <DiscoverView
      rating={current}
      heroImage={heroImage}
      loading={isQuery ? qLoading : loading}
      currentPage={isQuery ? qCurrentPage : currentPage}
      totalPages={isQuery ? qTotalPages : totalPages}
      searchTerm={searchTerm}
      searchItems={searchItems}
      selectStar={selectStar}
      loadMoreItems={loadMoreItems}
    >
      {hasErrors || qHasErrors ? (
        <p>Unable to display Movies.</p>
      ) : isQuery ? (
        qMovies
          .filter((movie) => movie.vote_average < current - 1)
          .map((element, i) => {
            return (
              <MovieThumb
                key={i}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${element.poster_path}`
                    : "https://img.icons8.com/clouds/500/000000/no-image.png"
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            );
          })
      ) : (
        movies
          .filter((movie) => movie.vote_average < current - 1)
          .map((element, i) => {
            return (
              <MovieThumb
                key={i}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${element.poster_path}`
                    : "https://img.icons8.com/clouds/500/000000/no-image.png"
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            );
          })
      )}
    </DiscoverView>
  );
};

export default Discover;
