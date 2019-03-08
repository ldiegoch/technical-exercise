import React, { Component } from "react";
import styles from './Image.css';

class Image extends Component {
  state = {
    hover: false,
  };

  handleOnMouseEnter = () => {
    this.setState({ hover: true });
  }

  handleOnMouseLeave = () => {
    this.setState({ hover: false });
  }

  render () {
    const src = this.state.hover ? this.props.imageUrl : this.props.stillImage;
    const ratio = this.props.columnWidth/this.props.width;
    return (
      <div
        className='image'
        style={{width:this.props.columnWidth+'px'}}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        <img
          className='image__img--rounded'
          src={src}
          alt={this.props.label}
          height={this.props.height * ratio}
          width={this.props.columnWidth}
        />
        <div className='image__label'>{this.props.label}</div>
      </div>
    );
  }
}

export default Image;
