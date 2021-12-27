import axios from "axios";
import {
  GET_PHOTOS_FROM_NASA,
  GET_PHOTOS_BY_FILTER,
  GET_MANIFESTS_BY_ROVER_MODEL,
  GET_PHOTOS_BY_SEARCH,
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
  GET_PHOTO_DETAILS,
  GET_PHOTO_DETAILS_FAVORITES,
  ADD_SEARCH_PARAMS_FAVORITES
} from "./constants";

//get photos by default from API
export function getPhotosFromApi() {
  return async function (dispatch) {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1200&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        let { photos } = response.data;
        dispatch({
          type: GET_PHOTOS_FROM_NASA,
          payload: photos,
        });
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  };
}

//get photos by model by default
export function getPhotosByModel(model) {
  return async function (dispatch) {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${model}/photos?sol=2000&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        let { photos } = response.data;
        dispatch({
          type: GET_PHOTOS_BY_FILTER,
          payload: photos,
        });
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  };
}

//get manifiest by model
export function getManifestByModel(model) {
  return async function (dispatch) {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/manifests/${model}/?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        dispatch({
          type: GET_MANIFESTS_BY_ROVER_MODEL,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  };
}


//get queries custom by model, date (earth & sol) and camera.
export function getPhotosBySearch(data) {
  const { date, rover, camera } = data;
  return async function (dispatch) {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${date}&camera=${camera}&api_key=${process.env.REACT_APP_API_KEY}`
        )
      .then((response) => {
        let { photos } = response.data;
        dispatch({
          type: GET_PHOTOS_BY_SEARCH,
          payload: photos,
        });
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
    };
  }
  
  // Add to Favorites
  export function addToFavorites(id) {
    return function (dispatch) {
      dispatch({ type: ADD_TO_FAVORITES, payload: id });
    };
  }
  
  // Delete from Favorites
  export function deleteFromFavorites(id) {
    return function (dispatch) {
      dispatch({ type: DELETE_FROM_FAVORITES, payload: id });
    };
  }

  // Details by :id
export function getPhotoDetails(id) {
  return function (dispatch) {
    dispatch({ type: GET_PHOTO_DETAILS, payload: id });
  };
}

  // Details from Favorites by :id
  export function getPhotoDetailsFavorites(id) {
    return function (dispatch) {
      dispatch({ type: GET_PHOTO_DETAILS_FAVORITES, payload: id });
    };
  }

  // Details from Favorites by :id
  export function addSearchParamFavorites(data) {
    return function (dispatch) {
      dispatch({ type: ADD_SEARCH_PARAMS_FAVORITES, payload: data });
    };
  }