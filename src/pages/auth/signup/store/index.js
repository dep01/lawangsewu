import { SIGNUP_FORM_SCHEMA } from "./schema_form";
import { ALL_ACTION } from "../../../../redux";
import { SysShowToast } from "../../../../utils/global_store";

export const SIGNUP_ACTION = {
  SIGNUP_REQUEST: "SIGNUP_REQUEST",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILED: "SIGNUP_FAILED",
  SIGNUP_RESET: "SIGNUP_RESET",
};
const SIGNUP_STATE = {
  is_login: false,
};
export const SIGNUP_REDUCER = (state = SIGNUP_STATE, action) => {
  switch (action.type) {
    case SIGNUP_ACTION.SIGNUP_REQUEST:
      return { ...state };
    case SIGNUP_ACTION.SIGNUP_SUCCESS:
      return { ...state, is_login: true };
    case SIGNUP_ACTION.SIGNUP_FAILED:
      return { ...state, is_login: false };
    case SIGNUP_ACTION.SIGNUP_RESET:
      return state;
    default:
      return state;
  }
};
export const USE_STATE = (state = SIGNUP_STATE) => {
  return state;
};

export const doLogin = async (form = SIGNUP_FORM_SCHEMA) => {
  // dispatch({ type: ALL_ACTION.GLOBAL_ACTION.GLOBAL_LOADING_TRUE });
  // dispatch({ type: SIGNUP_ACTION.SIGNUP_REQUEST });
  // try {
  //   console.log(form);
  //   const resp = { hoax: "name" }; // FOR API
  //   dispatch({ type: SIGNUP_ACTION.SIGNUP_SUCCESS, payload: resp });
  // } catch (error) {
  //   showToast({ message: error.message, type: "error" });
  //   dispatch({ type: SIGNUP_ACTION.SIGNUP_FAILED, payload: error });
  // }
  // showToast({message:"hohohoho"})
  // setTimeout(() => {
  //   dispatch({ type: ALL_ACTION.GLOBAL_ACTION.GLOBAL_LOADING_FALSE });
  // }, 4000);
};
