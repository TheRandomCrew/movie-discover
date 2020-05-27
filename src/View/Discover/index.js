import React from "react";
import "./Discover.css";

import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";

import HeroImage from "./HeroImage";
import SearchBar from "./SearchBar";
import FourColGrid from "./FourColGrid";
import LoadMoreBtn from "./LoadMoreBtn";
import Spinner from "../Spinner";
import StarRating from "./StarRating";

const Discover = ({
  children,
  rating,
  heroImage,
  loading,
  currentPage,
  totalPages,
  searchTerm,
  searchItems,
  selectStar,
  loadMoreItems,
}) => (
  <div className="md-home">
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
    <div className="md-home-grid">
      <FourColGrid
        header={
          <div className="md-grid-header">
            <h1>{searchTerm ? "Search Result" : "Popular Movies"}</h1>
            <StarRating
              totalStars={5}
              selectStar={selectStar}
              starsSelected={rating / 2}
            />
          </div>
        }
        loading={loading}
      >
        {children}
      </FourColGrid>
      {loading ? <Spinner /> : null}
      {currentPage <= totalPages && !loading ? (
        <LoadMoreBtn text="Load More" onClick={loadMoreItems} />
      ) : null}
    </div>
  </div>
);

export default Discover;
