import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import response from './temp/response'

function reducer(state = {images:[]}, action) {
  switch (action.type) {
    case 'ONSEARCH': {
      return Object.assign({},state,{
        images: getImagesFromResponse(action.value)
      });
    }
    default: {
      return state;
    }
  }
}

function getImagesFromResponse(response) {
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

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
