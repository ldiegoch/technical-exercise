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
    return (
      <div
        className='image'
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        <img
          className='image__img--rounded'
          src={src}
          alt={this.props.label}
          height={this.props.height}
          width={this.props.width}
        />
        <div className='image__label'>{this.props.label}</div>
      </div>
    );
  }
}

export default Image;
