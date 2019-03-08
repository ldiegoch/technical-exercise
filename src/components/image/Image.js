import React, { Component } from "react";
import { connect } from 'react-redux';
import './Image.css';

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

  handleOnMouseClick = () => {
    if(!this.props.isOpen) {
      this.props.dispatch({
        type: "OPENPHOTO",
        value: this.props.id,
      });
    }
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
        onClick={this.handleOnMouseClick}
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

const mapStateToImageProps = (state) => {
  return {
    isOpen: state.isOpen,
  };
};

const mapDispatchToImageProps = (dispatch) => (
  {
    dispatch: dispatch,
  }
);

const ReduxImage = connect(
  mapStateToImageProps,
  mapDispatchToImageProps
)(Image);

export default ReduxImage;
