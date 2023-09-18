import React from "react";
import Router from "./routes";
// import css
import "./assets/css/remixicon.css";
// import scss
import "./scss/style.scss";
// set skin on load
window.addEventListener("load", function () {
  let skinMode = localStorage.getItem("skin-mode");
  let HTMLTag = document.querySelector("html");
  if (skinMode) {
    HTMLTag.setAttribute("data-skin", skinMode);
  }
});
// redux init
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { ROOT_REDUCER } from "./redux";
const store = createStore(ROOT_REDUCER);

export default function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
       <Router/>
      </React.Fragment>
    </Provider>
  );
}
