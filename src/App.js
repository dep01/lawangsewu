import React from "react";
import Router from "./routes";
import "./assets/css/remixicon.css";
import "./scss/style.scss";

import {globalStore,global_base_state} from "./utils/global_store"
import GlobalLoadingBlock from "./components/atoms/Loading";
window.addEventListener("load", function () {
  let skinMode = localStorage.getItem("skin-mode");
  let HTMLTag = document.querySelector("html");
  if (skinMode) {
    HTMLTag.setAttribute("data-skin", skinMode);
  }
});

export default function App() {
  const state = {...globalStore(state=>global_base_state(state))}
  return (
    <React.Fragment>
      {state.is_loading&&<GlobalLoadingBlock/>}
      <Router />
    </React.Fragment>
  );
}
