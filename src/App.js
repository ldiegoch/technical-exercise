import React, { Component } from "react";
import "./App.css";
import SearchBar from './components/search-bar/SearchBar';
import StackGrid, { transitions, easings } from "react-stack-grid";
import Image from "./components/image/Image";
import response from './temp/response';
import connect from 'react-redux/es/connect/connect'

class App extends Component {
  state = {
    images: [],
  };
  gutterWidth = 20;
  gutterHeight = 20;
  columnWidth = 300;
  componentDidMount() {
    this.setState({
      images: this.getImagesFromResponse(response)
    });
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
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToAppProps = (state) => {
  return {
    images: state.images,
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
