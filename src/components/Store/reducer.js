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

const initialState = {
  photos: [],
  manifest: {},
  favorites: [],
  photoDetails: null,
  searchFavorites: [],
  apodPhotos: [],
  epicInfo: [],
  fetching: false,
  error: null,
  fetching_login: false,
  error_login: null,
  userInfo: null
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

    case ADD_SEARCH_PARAMS_FAVORITES:
      return {
        ...state,
        searchFavorites: state.searchFavorites.concat(action.payload),
      };

    case DELETE_SEARCH_PARAMS_FAVORITES:
      return {
        ...state,
        searchFavorites: state.searchFavorites.filter(
          (p) => p.id !== action.payload
        ),
      };

    case GET_PHOTOS_FROM_NASA:
      return {
        ...state,
        photos: action.payload,
        fetching: false,
        error: null,
      };

    case GET_PHOTOS_STATUS:
      return {
        ...state,
        fetching: true,
      };

    case GET_PHOTOS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    case GET_PHOTOS_FROM_APOD:
      return {
        ...state,
        apodPhotos: action.payload,
        fetching: false,
        error: null,
      };

    case GET_INFO_FROM_EPIC:
      return {
        ...state,
        epicInfo: action.payload,
        fetching: false,
        error: null,
      };

    case GET_PHOTOS_BY_SEARCH:
      return {
        ...state,
        photos: action.payload,
        fetching: false,
        error: null,
      };

    case GET_PHOTOS_BY_FILTER:
      return {
        ...state,
        photos: action.payload,
        fetching: false,
        error: null,
      };

    case GET_MANIFESTS_BY_ROVER_MODEL:
      return {
        ...state,
        manifest: action.payload,
        fetching: false,
        error: null,
      };

    case GET_PHOTO_DETAILS:
      return {
        ...state,
        photoDetails: state.photos.filter((p) => p.id === action.payload),
      };

    case GET_PHOTO_DETAILS_FAVORITES:
      return {
        ...state,
        photoDetails: state.favorites.filter((p) => p.id === action.payload),
      };

    case LOGIN:
      return {
        ...state,
        fetching_login: true,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        fetching_login: false,
        error_login: action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching_login: false,
        error_login: null,
        userInfo: action.payload,
      };

    default:
      return state;
  }
}
