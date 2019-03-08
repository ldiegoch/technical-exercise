import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import SearchBar from './components/search-bar/SearchBar';
import StackGrid, { transitions, easings } from "react-stack-grid";
import Image from "./components/image/Image";
import response from './temp/response';
import connect from 'react-redux/es/connect/connect';
import client from './api/giphy';
import debounce from 'lodash/debounce';

class App extends Component {
  state = {
    images: [],
    loading: false,
  };
  gutterWidth = 20;
  gutterHeight = 20;
  columnWidth = 300;
  componentDidMount() {
    this.setState({
      images: this.getImagesFromResponse(response)
    });
  }
  componentDidUpdate() {
    if(this.props.images.length === 100) {
      let top = Math.abs(window.pageYOffset * 0.66);
      window.scrollTo(0,top);
    }

  }
  getImagesFromResponse = (response) => {
    return response.data.map(image => {
      return {
        id: image.id,
        title: image.title,
        originalImage: image.images.original.url,
        originalWidth: image.images.original.width,
        originalHeigth: image.images.original.height,
        imageUrl: image.images.fixed_width_small.url,
        width: image.images.fixed_width.width,
        height: image.images.fixed_width.height,
        imageStill: image.images.fixed_width_still.url,
      };
    })
  };
  getNextImages = debounce((q) => {
    console.log('mouse enter');
    if (this.props.totalCount && !this.state.loading && this.props.offset < this.props.totalCount) {
      console.log('entros');
      const dispatch = this.props.dispatch;
      const setState = this.setState.bind(this);
      const q = this.props.q;
      setState({
        loading: true,
      });
      client.search({q: this.props.q, offset: this.props.offset},
        (response) => {
          dispatch({
            type: "ONNEXTRESULTS",
            value: response,
            q: q,
          });
          setState({
            loading: false,
          });
        });
    } else {
      console.log(this.state);
    }
  }, 500);
  handleNextImages = () => {
    this.getNextImages();
  };
  render() {
    console.log(this.props);
    return (
      <div id='app-container'>
        <SearchBar/>
        <StackGrid
          columnWidth={this.columnWidth}
          gutterWidth={this.gutterWidth}
          gutterHeight={this.gutterHeight}
        >
          {this.props.images.map(obj => (
            <Image
              key={obj.id}
              src={obj.src}
              label={obj.title}
              height={obj.height}
              width={obj.width}
              imageUrl={obj.imageUrl}
              stillImage={obj.imageStill}
              originalImage={obj.originalImage}
              originalWidth='300'
              originalHeight='300'
              columnWidth={this.columnWidth}
            />
          ))}
        </StackGrid>
        { this.props.offset > 0 ? (
            <div
              style={{height:"20px",display:"block", width: '100%'}}
              onMouseEnter={this.handleNextImages}
            ></div>
          ) : null
        }

      </div>
    );
  }
}

const mapStateToAppProps = (state) => {
  return {
    images: state.images,
    totalCount: state.totalCount,
    offset: state.offset,
    q: state.q,
  };
};

const mapDispatchToAppProps = (dispatch) => (
  {
    dispatch: dispatch,
  }
);

const ReduxApp = connect(
  mapStateToAppProps,
  mapDispatchToAppProps
)(App);

export default ReduxApp;
