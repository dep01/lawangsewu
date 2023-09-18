import { LOGIN_FORM_SCHEMA } from "./schema_form";
import { ALL_ACTION } from "../../../../redux";
import { SysShowToast } from "../../../../utils/global_store";

export const LOGIN_ACTION = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGIN_RESET: "LOGIN_RESET",
};
const LOGIN_STATE = {
  is_login: false,
};
export const LOGIN_REDUCER = (state = LOGIN_STATE, action) => {
  switch (action.type) {
    case LOGIN_ACTION.LOGIN_REQUEST:
      return { ...state };
    case LOGIN_ACTION.LOGIN_SUCCESS:
      return { ...state, is_login: true };
    case LOGIN_ACTION.LOGIN_FAILED:
      return { ...state, is_login: false };
    case LOGIN_ACTION.LOGIN_RESET:
      return state;
    default:
      return state;
  }
};
export const USE_STATE = (state = LOGIN_STATE) => {
  return state;
};

export const doLogin = async (form = LOGIN_FORM_SCHEMA) => {
  // dispatch({ type: ALL_ACTION.GLOBAL_ACTION.GLOBAL_LOADING_TRUE });
  // dispatch({ type: LOGIN_ACTION.LOGIN_REQUEST });
  // try {
  //   console.log(form);
  //   const resp = { hoax: "name" }; // FOR API
  //   dispatch({ type: LOGIN_ACTION.LOGIN_SUCCESS, payload: resp });
  // } catch (error) {
  //   showToast({ message: error.message, type: "error" });
  //   dispatch({ type: LOGIN_ACTION.LOGIN_FAILED, payload: error });
  // }
  // showToast({message:"hohohoho"})
  // setTimeout(() => {
  //   dispatch({ type: ALL_ACTION.GLOBAL_ACTION.GLOBAL_LOADING_FALSE });
  // }, 4000);
};
