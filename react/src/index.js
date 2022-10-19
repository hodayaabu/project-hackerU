import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

// add bootstrap to react
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

// add toastify
import "react-toastify/dist/ReactToastify.css";

import App from './App';
import './css/App.css';

import store from "./store/index.redux";



axios.defaults.baseURL = "http://localhost:3003";

//axios will add this config to each request
axios.interceptors.request.use((config) => {

  //get token from local storage
  const token = localStorage.getItem("token");

  //check if there is token in local storage
  if (token) {

    //add token to headers for secure routes
    config.headers["user-token"] = token;
  }

  config.headers["Content-Type"] = "application/json";
  return config;
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
