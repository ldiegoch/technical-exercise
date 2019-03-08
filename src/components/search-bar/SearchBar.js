import React, { Component } from "react";
import searchBar from "./SearchBar.css";
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

class SearchBar extends Component {
  state = {
    q: '',
  }

  dispatchSearch = debounce((q) => {
    this.props.dispatch({
      type: "ONSEARCH",
      value: q,
    });
    console.log(this.state.q);
  }, 500);

  handleOnChange = (e) => {
    this.setState({
      q: e.target.value,
    })
    this.dispatchSearch(e.target.value);
  };

  render() {
    return (
      <header className='search-bar app--padding'>
        <i className='fas fa-search search-bar__icon'></i>
        <input
          className='search-bar__input search-bar__input--rounded'
          placeholder='Search'
          value={this.state.q}
          onChange={this.handleOnChange}
        ></input>
      </header>
    );
  }
}

const mapStateToSearchBarProps = (state) => {
  return {
    q: state.q,
  };
};

const mapDispatchToSearchBarProps = (dispatch) => (
  {
    dispatch: dispatch,
  }
);

const ReduxSearchBar = connect(
  mapStateToSearchBarProps,
  mapDispatchToSearchBarProps
)(SearchBar);

export default ReduxSearchBar;
