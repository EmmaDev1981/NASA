import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './components/Store/index';
// import dotenv from 'dotenv';
// import axios from 'axios';
import './index.css';
// dotenv.config()

// axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3000"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);