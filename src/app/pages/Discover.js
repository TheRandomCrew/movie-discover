import React, { Component } from "react";
import { Discover as DiscoverView, MovieThumb } from "../../View";
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

const defaultState = {
  rating: 10,
  movies: [],
  heroImage: null,
  loading: false,
  currentPage: 0,
  totalPages: 0,
  searchTerm: "",
};

class Discover extends Component {
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
    const { searchItems, selectStar, loadMoreItems } = this;
    return (
      <DiscoverView
        rating={rating}
        heroImage={heroImage}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        searchTerm={searchTerm}
        searchItems={searchItems}
        selectStar={selectStar}
        loadMoreItems={loadMoreItems}
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
      </DiscoverView>
    );
  }
}

export default Discover;
