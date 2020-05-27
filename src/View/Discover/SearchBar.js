import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    value: "",
  };

  timeout = null;

  doSearch = (event) => {
    this.setState({ value: event.target.value });
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 500);
  };

  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <img
            src="https://img.icons8.com/cotton/50/000000/search--v2.png"
            className="rmdb-icon-search"
            alt="search"
          />
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search for a movie..."
            onChange={this.doSearch}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
