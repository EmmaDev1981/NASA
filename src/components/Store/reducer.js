import {
  GET_PHOTOS_FROM_NASA,
  GET_PHOTOS_BY_FILTER,
  GET_MANIFESTS_BY_ROVER_MODEL,
  FILTER_PHOTOS_BY_CAMERA,
  GET_PHOTOS_BY_EARTH_DATE,
  GET_PHOTOS_BY_SEARCH,
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
} from "./constants";

const initialState = {
  photos: [],
  photosBackup: [],
  manifest: {},
  cameras: [],
  favorites: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.concat(
          state.photos.filter((p) => p.id === action.payload)
        ),
      };

    case DELETE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((p) => p.id !== action.payload),
      };

    case GET_PHOTOS_FROM_NASA:
      return {
        ...state,
        photos: action.payload,
        photosBackup: action.payload,
      };

    case GET_PHOTOS_BY_SEARCH:
      return {
        ...state,
        photos: action.payload,
        photosBackup: action.payload,
      };

    case GET_PHOTOS_BY_FILTER:
      return {
        ...state,
        photos: action.payload,
        photosBackup: action.payload,
      };

    case GET_PHOTOS_BY_EARTH_DATE:
      return {
        ...state,
        photos: action.payload,
        photosBackup: action.payload,
      };

    case GET_MANIFESTS_BY_ROVER_MODEL:
      return {
        ...state,
        manifest: action.payload,
      };
    
    default:
      return state;
  }
}
