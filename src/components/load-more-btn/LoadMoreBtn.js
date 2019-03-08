import React from "react";
import "./LoadMoreBtn.css";

const LoadMoreBtn = (props) => {
  return (
    <div className='more-btn'>
      <div className={ 'more-btn__btn ' + (props.isLoading ? "more-btn__btn--loading" : null) } onClick={!props.isLoading ? props.onNextImages : null}>
        {props.isLoading ? "Loading..." : "More"}
      </div>
    </div>
  );
};

export default LoadMoreBtn;
