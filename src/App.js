import React, { Component } from "react";
import "./App.css";
import SearchBar from './components/search-bar/SearchBar';
import StackGrid, { transitions, easings } from "react-stack-grid";
import Image from "./components/image/Image";
import photos from './temp/photos';

class App extends Component {
  gutterWidth = 20;
  gutterHeight=20;
  columnWidth=300;
  render() {
    return (
      <div>
        <SearchBar/>
        <StackGrid
          columnWidth={this.columnWidth}
          gutterWidth={this.gutterWidth}
          gutterHeight={this.gutterHeight}
        >
          {photos.map(obj => (
            <Image
              src={obj.src}
              label={obj.label}
              height={300}
              width={300}
              image='https://media0.giphy.com/media/feqkVgjJpYtjy/200w.gif'
              stillImage={obj.src}
              originalImage="http://media0.giphy.com/media/feqkVgjJpYtjy/giphy.gif"
              originalWidth='300'
              originalHeight='300'
            />
          ))}
        </StackGrid>
      </div>
    );
  }
}

export default App;
