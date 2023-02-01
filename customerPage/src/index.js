import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
//import "mdb-react-ui-kit/dist/css/mdb.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import axios from "axios";

const store = createStore(reducer, compose(applyMiddleware(thunk)));

axios.interceptors.request.use((request) => {
  if (localStorage.getItem("TOKEN")) {
    request.headers["Authorization"] = "Bearer " + localStorage.getItem("TOKEN");
  };
  return request;
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  /* if ((error.response.status === 401 || error.response.status === 403) && localStorage.getItem("REFRESH_TOKEN")) {
    axios.post("http://localhost:8080/auth/refresh/token", { username: localStorage.getItem('USERNAME'), token: localStorage.getItem('REFRESH_TOKEN') }).then(res => {
      if (res.data.length !== 0) {
        localStorage.setItem('USERNAME', res.data.username);
        localStorage.setItem('TOKEN', res.data.authenticationToken);
        localStorage.setItem('REFRESH_TOKEN', res.data.refreshToken);
        axios({
          method: error.response.config.method, url: error.response.config.url, data: error.response.config.data
        }).then((res) => {
          if (res.status === 200 && error.config.headers.Navigation) {
            window.location.href = error.config.headers.Navigation;
          }
        });
      }
      else {
        localStorage.removeItem("USERNAME");
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        window.location.href = "/login";
      }
    }).catch(() => {
      localStorage.removeItem("USERNAME");
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
      window.location.href = "/login";
    });
  } else {
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    window.location.href = "/login";
  }
  return error; */
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
