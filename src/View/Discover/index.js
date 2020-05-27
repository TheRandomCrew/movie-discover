import React, { Component } from "react";
import "./Discover.css";

import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from "../../config";

import HeroImage from "./HeroImage";
import SearchBar from "./SearchBar";
import FourColGrid from "./FourColGrid";
import MovieThumb from "../MovieThumb";
import LoadMoreBtn from "./LoadMoreBtn";
import Spinner from "../Spinner";
import StarRating from "./StarRating";

const defaultState = {
  rating: 10,
  movies: [],
  heroImage: null,
  loading: false,
  currentPage: 0,
  totalPages: 0,
  searchTerm: "",
}

class Home extends Component {
  state = defaultState;

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}`;
    this.fetchItems(endpoint);
  }

  selectStar = (star) => {
    this.setState((prevState) => ({
      ...prevState,
      rating: star * 2,
    }));
  };

  searchItems = (searchTerm) => {
    let endpoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchTerm,
    });

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  loadMoreItems = () => {
    let endpoint = "";
    this.setState({
      loading: true,
    });

    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${
        this.state.currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&query${
        this.state.searchTerm
      }$page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages,
        });
      });
  };

  render() {
    const {
      rating,
      movies,
      heroImage,
      loading,
      currentPage,
      totalPages,
      searchTerm,
    } = this.state;
    const {
      searchItems,
      selectStar,
      loadMoreItems
    } = this;
    return (
      <div className="rmdb-home">
        {heroImage ? (
          <div>
            <HeroImage
              movieId={heroImage.id}
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              title={heroImage.original_title}
            >
              <SearchBar callback={searchItems} />
            </HeroImage>
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={
              <div className="rmdb-grid-header">
                <h1>
                  {searchTerm ? "Search Result" : "Popular Movies"}
                </h1>
                <StarRating
                  totalStars={5}
                  selectStar={selectStar}
                  starsSelected={rating / 2}
                />
              </div>
            }
            loading={loading}
          >
            {movies
              .filter((movie) => movie.vote_average < rating - 1)
              .map((element, i) => {
                return (
                  <MovieThumb
                    key={i}
                    clickable={true}
                    image={
                      element.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${element.poster_path}`
                        : "./images/no_image.jpg"
                    }
                    movieId={element.id}
                    movieName={element.original_title}
                  />
                );
              })}
          </FourColGrid>
          {loading ? <Spinner /> : null}
          {currentPage <= totalPages &&
          !loading ? (
            <LoadMoreBtn text="Load More" onClick={loadMoreItems} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
