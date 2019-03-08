import React, { Component } from "react";
import "./App.css";
import SearchBar from './components/search-bar/SearchBar';
import StackGrid from "react-stack-grid";
import Image from "./components/image/Image";
import MoreBtn from "./components/load-more-btn/LoadMoreBtn";
import Message from "./components/message/Message";
import random from './temp/random';
import connect from 'react-redux/es/connect/connect';
import client from './api/giphy';
import debounce from 'lodash/debounce';
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css';

class App extends Component {
  state = {
    images: [],
    loading: false,
    photoIndex: 0,
    isOpen: false,
  };
  gutterWidth = 20;
  gutterHeight = 20;
  columnWidth = 300;
  componentDidUpdate() {
    if(this.props.images.length > 90) {
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
  handleOnLightboxClose = () => {
    this.props.dispatch({
      type: "CLOSEPHOTO"
    });
  };
  handleOnLightboxNext = () => {
    this.props.dispatch({
      type: "NEXTPHOTO",
    })
  }
  handleOnLightboxPrev = () => {
    this.props.dispatch({
      type: "PREVPHOTO",
    })
  }
  handleNextImages = () => {
    this.getNextImages();
  };
  render() {
    const isOpen = this.props.isOpen;
    const photoIndex = this.props.photoIndex;
    const items = this.props.images.length ? this.props.images.map(obj => (
      <Image
        key={obj.id}
        id={obj.id}
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
    )) : random.map( obj => (
      <div style={ {"background-color": obj.color, "width": obj.width, "height": obj.height} } >
      </div>
    ));
    return (
      <div id='app-container'>
        <SearchBar/>
        <StackGrid
          columnWidth={this.columnWidth}
          gutterWidth={this.gutterWidth}
          gutterHeight={this.gutterHeight}
        >
          { items }
        </StackGrid>
        { this.props.offset > 0 ? (
            <MoreBtn onNextImages={this.handleNextImages} isLoading={this.state.loading}/>
          ) : null
        }

        { this.props.images.length === 0 && (
            <Message message='Enter a new search terms'/>
        )}

        {isOpen && (
          <Lightbox
            mainSrc={this.props.images[photoIndex].originalImage}
            nextSrc={this.props.images[(photoIndex + 1) % this.props.images.length].originalImage}
            prevSrc={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length].originalImage}
            onCloseRequest={this.handleOnLightboxClose}
            onMovePrevRequest={this.handleOnLightboxPrev}
            onMoveNextRequest={this.handleOnLightboxNext}
          />
        )}
        {  }
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
    isOpen: state.isOpen,
    photoIndex: state.photoIndex,
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
