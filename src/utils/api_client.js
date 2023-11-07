import { getSession, getToken } from "./session";
import { SESSION } from "./constants";
const API_URL = process.env.REACT_APP_API_URL;

const callbackModel = {
  code: 500,
  success: false,
  message: "Internal Server Error!",
  data: null,
};
export const LIMIT_PAGES = 10;
const default_timeout = 8000;

function timeoutHandler(method, timeout = default_timeout) {
  return Promise.race([
    method(),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Cannot connect to server!"));
      }, timeout);
    }),
  ]);
}
export const sys_get = async ({
  auth = false,
  endpoint = "",
  timeout = default_timeout,
}) => {
  try {
    let token = getToken();
    var callback = callbackModel;
    const response = await timeoutHandler(
      fetch(API_URL + endpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: auth ? "Bearer " + token : "",
        },
      }),
      timeout
    );
    const data = await response.json();
    callback.code = response.status;
    callback.success = response.status == 200 ? true : false;
    callback.message = data?.message ?? "";
    callback.data = data?.data ?? null;
    if (response.status != 201 && response.status != 200) {
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};

export const sys_post = async ({
  auth = false,
  endpoint = "",
  body = {},
  timeout = default_timeout,
}) => {
  try {
    let token = getToken();
    var callback = callbackModel;
    const response = await timeoutHandler(
      fetch(API_URL + endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: auth ? "Bearer " + token : "",
        },
        body: JSON.stringify(body),
      }),
      timeout
    );
    const data = await response.json();
    callback.code = response.status;
    callback.message = data?.message ?? "";
    callback.success = response.status == 200 ? true : false;
    callback.data = data?.data ?? null;
    if (response.status != 201 && response.status != 200) {
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};
export const sys_del = async ({
  auth = false,
  endpoint = "",
  timeout = default_timeout,
}) => {
  try {
    let token = getToken();
    var callback = callbackModel;
    const response = await timeoutHandler(
      fetch(API_URL + endpoint, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: auth ? "Bearer " + token : "",
        },
      }),
      timeout
    );
    const data = await response.json();
    callback.code = response.status;
    callback.success = response.status == 200 ? true : false;
    callback.message = data?.message ?? "";
    callback.data = data?.data ?? null;
    if (response.status != 201 && response.status != 200) {
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};
export const sys_put = async ({
  auth = false,
  endpoint = "",
  body = {},
  is_refresh = false,
  timeout = default_timeout,
}) => {
  try {
    let token = getToken();
    if (is_refresh) {
      token = getSession(SESSION.REFRESH_TOKEN);
    }
    var callback = callbackModel;
    const response = await timeoutHandler(
      fetch(API_URL + endpoint, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: auth ? "Bearer " + token : "",
        },
        body: JSON.stringify(body),
      }),
      timeout
    );
    const data = await response.json();
    callback.code = response.status;
    callback.success = response.status == 200 ? true : false;
    callback.message = data?.message ?? "";
    callback.data = data?.data ?? null;
    if (response.status != 201 && response.status != 200) {
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};
