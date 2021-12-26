import axios from "axios";

import {
  GET_PHOTOS_FROM_NASA,
  GET_PHOTOS_BY_FILTER,
  GET_MANIFESTS_BY_ROVER_MODEL,
  // FILTER_PHOTOS_BY_CAMERA,
  GET_PHOTOS_BY_EARTH_DATE,
  GET_PHOTOS_BY_SEARCH,
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
} from "./constants";

//trae todas las categorias
export function getPhotosFromApi() {
  return async function (dispatch) {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=nrtsuf8mffXoZWnXIArIzsJ8GIjg8sZoMyxUcqeZ`
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

//trae fotos por tipo de rover
export function getPhotosByModel(model) {
  return async function (dispatch) {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${model}/photos?sol=2000&api_key=nrtsuf8mffXoZWnXIArIzsJ8GIjg8sZoMyxUcqeZ`
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

//trae fotos por fecha de la tierra
export function getPhotosByEarthDate(date) {
  return async function (dispatch) {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=nrtsuf8mffXoZWnXIArIzsJ8GIjg8sZoMyxUcqeZ`
      )
      .then((response) => {
        let { photos } = response.data;
        dispatch({
          type: GET_PHOTOS_BY_EARTH_DATE,
          payload: photos,
        });
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  };
}

//trae manifiesto por modelo de rover
export function getManifestByModel(model) {
  return async function (dispatch) {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/manifests/${model}/?api_key=nrtsuf8mffXoZWnXIArIzsJ8GIjg8sZoMyxUcqeZ`
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

// //* Filtrado
// export function filterByCamera(filter) {
//   return function (dispatch) {
//     dispatch({ type: FILTER_PHOTOS_BY_CAMERA, payload: filter });
//   };
// }

//* Add to Favorites
export function addToFavorites(id) {
  return function (dispatch) {
    dispatch({ type: ADD_TO_FAVORITES, payload: id });
  };
}

//* Delete from Favorites
export function deleteFromFavorites(id) {
  return function (dispatch) {
    dispatch({ type: DELETE_FROM_FAVORITES, payload: id });
  };
}

//trae fotos por modelo, camara y fecha
export function getPhotosBySearch(data) {
  const { date, rover, camera } = data;
  return async function (dispatch) {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&api_key=nrtsuf8mffXoZWnXIArIzsJ8GIjg8sZoMyxUcqeZ`
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
