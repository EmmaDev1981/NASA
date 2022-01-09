import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

function saveToLocalStorage(state) {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
}

function loadFromLocalStorage() {
  // localStorage.clear()
  const serializedState = localStorage.getItem("state");
  if (serializedState === null) return undefined;
  return JSON.parse(serializedState);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const presistedState = loadFromLocalStorage();
const store = createStore(
  rootReducer,
  presistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
