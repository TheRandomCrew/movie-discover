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
import FourColGrid from "../FourColGrid";
import MovieThumb from "../MovieThumb";
import LoadMoreBtn from "./LoadMoreBtn";
import Spinner from "../Spinner";
import StarRating from "./StarRating";

class Home extends Component {
  state = {
    rating: 10,
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: "",
  };

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
    console.log(searchTerm);
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
    return (
      <div className="rmdb-home">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              movieId={this.state.heroImage.id}
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
              title={this.state.heroImage.original_title}
            >
              <SearchBar callback={this.searchItems} />
            </HeroImage>
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={
              <div className="rmdb-grid-header">
                <h1>
                  {this.state.searchTerm ? "Search Result" : "Popular Movies"}
                </h1>
                <StarRating
                  totalStars={5}
                  selectStar={this.selectStar}
                  starsSelected={this.state.rating / 2}
                />
              </div>
            }
            loading={this.state.loading}
          >
            {this.state.movies
              .filter((movie) => movie.vote_average < this.state.rating - 1)
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
          {this.state.loading ? <Spinner /> : null}
          {this.state.currentPage <= this.state.totalPages &&
          !this.state.loading ? (
            <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
