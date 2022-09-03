import axios from "axios";
import * as dayjs from "dayjs";
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

  //Google login
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

  //sign UP email and Pass
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT,

  //Sign IN with email and pass
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,

  RESET_LOGIN,
  RESET_PASSWORD_BY_EMAIL
  
} from "./constants";

//FIREBASE
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey:`${process.env.REACT_APP_APIKEY}`,
  authDomain:`${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId:`${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket:`${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId:`${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId:`${process.env.REACT_APP_APP_ID}`,
  measurementId:`${process.env.REACT_APP_MEASUREMENT_ID}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Google Analytics
const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");

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
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    dispatch({
            type: LOGIN_SUCCESS,
            payload: user,
          });
  })
  .catch ((error) => {
    dispatch({
            type: LOGIN_ERROR,
            payload: error.code,
          });
  })
};

//SIGN UP with email & password and then LOGIN automaticly
export let doSignUpwithEmailAndPassword = (email, password) => (dispatch) => {
  dispatch({
    type: SIGN_UP,
  });
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      dispatch({
              type: SIGN_UP_SUCCESS,
              payload: user,
            });
    })
    .catch((error) => {
            dispatch({
        type: SIGN_UP_ERROR,
        payload: error.code
      });
    });
};

//SIGN IN with email & password (registered users)
export let doSignInwithEmailAndPassword = (email, password) => (dispatch) => {
  dispatch({
    type: SIGN_IN,
  });
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      dispatch({
                    type: SIGN_IN_SUCCESS,
                    payload: user,
                  });
    })
    .catch((error) => {
           dispatch({
              type: SIGN_IN_ERROR,
              payload: error.code,
            });
    });
};

//signOUT
export let signOUT = () => (dispatch) => {

  const auth = getAuth();
  return signOut(auth)
    .then(() => {
      // Sign-out successful.
      dispatch({
              type: SIGN_OUT,
            });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Reset LOGIN
export function resetLogin() {
  return function (dispatch) {
    dispatch({ type: RESET_LOGIN });
  };
}

// Password RESET
export let doResetPasswordByEmail = (email) => (dispatch) => {
  
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      dispatch({
        type: RESET_PASSWORD_BY_EMAIL,
      });
    })
    .catch((error) => {
      console.log(error.code);
    });
};