import React, { Component } from "react";
import searchBar from "./SearchBar.css";

class SearchBar extends Component {
  render() {
    return (
      <header className='search-bar app--padding'>
        <i className='fas fa-search search-bar__icon'></i>
        <input
          className='search-bar__input search-bar__input--rounded'
          placeholder='Search'
        ></input>
      </header>
    );
  }
}

export default SearchBar;
