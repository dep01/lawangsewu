import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { getToken } from "./session";
import TimeoutLink from "apollo-link-timeout";
const GQL_URL = process.env.REACT_APP_GQL_URL;

const callbackModel = {
  code: 500,
  success: false,
  message: "Cannot connect to server!",
  data: null,
};
const default_timeout = 8000;
function timeoutHandler(operation, method,timeout = default_timeout) {
  return Promise.race([
    method(),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Cannot connect to server!"));
      }, timeout);
    }),
  ]);
}

export async function query_gql({ str_query = ``, auth = true, path = "",timeout=default_timeout }) {
  try {
    let token = getToken();
    var callback = callbackModel;
    const client = new ApolloClient({
      uri: GQL_URL,
      cache: new InMemoryCache(),
      headers: auth && {
        Authorization: token,
      },
      addTypename:false
    });
    const resp = await timeoutHandler(client.query.bind(client), () =>
      client.query({ query: gql(str_query) }),timeout
    );
    if (resp.errors) {
      callback.message = resp.errors[0].message;
      throw callback;
    }
    callback.message = "Success";
    callback.success = true;
    callback.code = 200;
    callback.data = resp.data[path];
    return callback;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function mutation_gql({ str_query = ``, auth = true, path = "",timeout=default_timeout}) {
  try {
    let token = getToken();
    var callback = callbackModel;
    // console.log(str_query);
    const client = new ApolloClient({
      uri: GQL_URL,
      cache: new InMemoryCache(),
      headers: auth && {
        Authorization: token,
      },
      addTypename:false
    });
    const resp = await timeoutHandler(client.mutate.bind(client),()=>client.mutate({ mutation: gql(str_query) }),timeout);
    if (resp.errors) {
      callback.message = resp.errors[0].message;
      throw callback;
    }
    callback.message = "Success";
    callback.success = true;
    callback.code = 200;
    callback.data = resp.data[path];
    return callback;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
