import React, { Component } from "react";
import "./SearchBar.css";
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import client from './../../api/giphy';

class SearchBar extends Component {
  state = {
    q: '',
  }
  dispatchSearch = debounce((q) => {
    const dispatch = this.props.dispatch;
    client.search({ q: this.state.q, offset: 0 }, (response) => {
      dispatch({
        type: "ONSEARCH",
        value: response,
        q: this.state.q,
      });
    });
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
    totalCount: state.totalCount,
    offset: state.offset,
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
