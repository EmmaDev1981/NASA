import axios from "axios";
import * as dayjs from "dayjs";
import { loginWithGoogle } from "../../firebase";
import {
  GET_PHOTOS_FROM_NASA,
  GET_PHOTOS_BY_FILTER,
  GET_MANIFESTS_BY_ROVER_MODEL,
  GET_PHOTOS_BY_SEARCH,
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
  GET_PHOTO_DETAILS,
  GET_PHOTO_DETAILS_FAVORITES,
  ADD_SEARCH_PARAMS_FAVORITES,
  DELETE_SEARCH_PARAMS_FAVORITES,
  GET_PHOTOS_FROM_APOD,
  GET_INFO_FROM_EPIC,
  GET_PHOTOS_STATUS,
  GET_PHOTOS_ERROR,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from "./constants";

//get photos by default from API
export function getPhotosFromApi() {
  return async function (dispatch) {
    dispatch({
      type: GET_PHOTOS_STATUS,
    });
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=3340&api_key=${process.env.REACT_APP_API}`
      )
      .then((response) => {
        let { photos } = response.data;
        dispatch({
          type: GET_PHOTOS_FROM_NASA,
          payload: photos,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PHOTOS_ERROR,
          payload: err,
        });
        console.error(err);
      });
  };
}

//get photos by model by default
export function getPhotosByModel(model) {
  let today = dayjs().subtract(2, "day").format().split("T")[0];
  let earthDate = "";
  if (model === "curiosity") earthDate = today;
  if (model === "opportunity") earthDate = "2018-06-11";
  if (model === "spirit") earthDate = "2010-03-21";
  return async function (dispatch) {
    dispatch({
      type: GET_PHOTOS_STATUS,
    });
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${model}/photos?earth_date=${earthDate}&api_key=${process.env.REACT_APP_API}`
      )
      .then((response) => {
        let { photos } = response.data;
        dispatch({
          type: GET_PHOTOS_BY_FILTER,
          payload: photos,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PHOTOS_ERROR,
          payload: err,
        });
        console.error(err);
      });
  };
}

//get manifiest by model
export function getManifestByModel(model) {
  return async function (dispatch) {
    dispatch({
      type: GET_PHOTOS_STATUS,
    });
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/manifests/${model}/?api_key=${process.env.REACT_APP_API}`
      )
      .then((response) => {
        dispatch({
          type: GET_MANIFESTS_BY_ROVER_MODEL,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PHOTOS_ERROR,
          payload: err,
        });
        console.error(err);
      });
  };
}

//get queries custom by model, date (earth & sol) and camera.
export function getPhotosBySearch(data) {
  const { date, rover, camera } = data;
  return async function (dispatch) {
    dispatch({
      type: GET_PHOTOS_STATUS,
    });
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${date}&camera=${camera}&api_key=${process.env.REACT_APP_API}`
      )
      .then((response) => {
        let { photos } = response.data;
        dispatch({
          type: GET_PHOTOS_BY_SEARCH,
          payload: photos,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PHOTOS_ERROR,
          payload: err,
        });
        console.error(err);
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

// Add searched parameters
export function addSearchParamFavorites(data) {
  return function (dispatch) {
    dispatch({ type: ADD_SEARCH_PARAMS_FAVORITES, payload: data });
  };
}

// Delete searched parameters by :id
export function deleteSearchParamFavorites(id) {
  return function (dispatch) {
    dispatch({ type: DELETE_SEARCH_PARAMS_FAVORITES, payload: id });
  };
}

//APOD
export function getPhotosFromApod(data) {
  const { date, count, startDate, endDate } = data;
  return async function (dispatch) {
    dispatch({
      type: GET_PHOTOS_STATUS,
    });
    return await axios
      .get(
        `https://api.nasa.gov/planetary/apod?&date=${date}&count=${count}&start_date=${startDate}&end_date=${endDate}&api_key=${process.env.REACT_APP_API}`
      )
      .then((response) => {
        dispatch({
          type: GET_PHOTOS_FROM_APOD,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PHOTOS_ERROR,
          payload: err,
        });
        console.error(err);
      });
  };
}

//EPIC info
export function getInfoFromEpic(date) {
  return async function (dispatch) {
    dispatch({
      type: GET_PHOTOS_STATUS,
    });
    return await axios
      .get(
        `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${process.env.REACT_APP_API}`
      )
      .then((response) => {
        dispatch({
          type: GET_INFO_FROM_EPIC,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PHOTOS_ERROR,
          payload: err,
        });
        console.error(err);
      });
  };
}

//Google Login
export let doGoogleLoginAction = () => (dispatch) => {
  dispatch({
    type: LOGIN,
  });
  return loginWithGoogle()
    .then((user) => {
      console.log(user)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...user },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.message,
      });
    });
};
