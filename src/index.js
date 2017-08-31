import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import * as firebase from "firebase";

import { BrowserRouter } from "react-router-dom";

var config = {
  apiKey: "AIzaSyBCP46xFfxtqdWbc3xNpqRZpoEufw4SMsU",
  authDomain: "reactdemo-694f2.firebaseapp.com",
  databaseURL: "https://reactdemo-694f2.firebaseio.com",
  storageBucket: ""
  // projectId: "test-4efe0",
  // messagingSenderId: "219461382308"
};
firebase.initializeApp(config);
firebase
  .auth()
  .signInWithEmailAndPassword("tuannguyen@nhatvietgroup.com.vn", "123456")
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === "auth/wrong-password") {
      alert("Wrong password.");
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
