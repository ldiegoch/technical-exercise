/* eslint-disable no-undef */
function search(query, cb) {
  return fetch(
    `http://api.giphy.com/v1/gifs/search?q=` + encodeURI(query.q) + '&api_key=LiT4XaeBUDCDtVpLNuTcc8fzKv84AmW6&offset=' + query.offset,
    {
      accept: 'application/json',
      method: 'GET'
    }
  ).then(checkStatus)
  .then(parseJSON)
  .then(cb)
  .catch((error) => console.log(error.message));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { search };
export default Client;
