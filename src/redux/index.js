import { combineReducers } from "redux";
import { LOGIN_REDUCER, LOGIN_ACTION } from "../pages/Login/store/index";

export const GLOBAL_ACTION = {
  GLOBAL_LOADING_TRUE: "GLOBAL_LOADING_TRUE",
  GLOBAL_LOADING_FALSE: "GLOBAL_LOADING_FALSE",
  GLOBAL_LOGIN_REQUEST: "GLOBAL_LOGIN_REQUEST",
  GLOBAL_LOGIN_FAILED: "GLOBAL_LOGIN_FAILED",
  GLOBAL_LOGIN_SUCCESS: "GLOBAL_LOGIN_SUCCESS",
  GLOBAL_RESET: "GLOBAL_RESET",
  GLOBAL_ERROR: "GLOBAL_ERROR",
};
export const ALL_ACTION = {
  GLOBAL_ACTION,
  LOGIN_ACTION,
};
const GLOBAL_STATE = {
  is_loading: false,
  is_login: false,
  message:""
};
export const GLOBAL_REDUCER = (state = GLOBAL_STATE, action) => {
  switch (action.type) {
    case GLOBAL_ACTION.GLOBAL_LOADING_TRUE:
      return { ...state, is_loading: true };
    case GLOBAL_ACTION.GLOBAL_LOADING_FALSE:
      return { ...state, is_loading: false };
    case GLOBAL_ACTION.GLOBAL_LOGIN_REQUEST:
      return { ...state, is_login: false, is_loading: true };
    case GLOBAL_ACTION.GLOBAL_LOGIN_FAILED:
      return { ...state, is_login: false, is_loading: false };
    case GLOBAL_ACTION.GLOBAL_LOGIN_SUCCESS:
      return { ...state, is_login: true, is_loading: false };
      case GLOBAL_ACTION.GLOBAL_ERROR:
        return { ...state, message:action.payload };
    case GLOBAL_ACTION.GLOBAL_RESET:
      return state;
    default:
      return state;
  }
};

export const USE_GLOBAL_STATE = (state = GLOBAL_STATE) => {
  return state;
};

export const REDUCER = {
  LOGIN_REDUCER: "LOGIN_REDUCER",
  GLOBAL_REDUCER: "GLOBAL_REDUCER",
};
export const ROOT_REDUCER = combineReducers({
  [REDUCER.LOGIN_REDUCER]: LOGIN_REDUCER,
  [REDUCER.GLOBAL_REDUCER]: GLOBAL_REDUCER,
});
