import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';

/**
 * Init GraphQL
 */
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://0.0.0.0:3001/doc', // STATIC URL, YOU HAVE TO CHANGE IT LATER
});

const authLink = setContext((_, { headers }) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4NjU2MDM4LTczMGItNDcwZC05NjQ0LTBlYjk5MjNjNmY1NCIsInVzZXJjb2RlIjoiVVNSLVRkMEtnTVVSbXMiLCJlbWFpbCI6Im5ld3VzZXIzQGdtYWlsLmNvbSJ9.yHGUW9zK4l_VYSODGuvYZmAadfpn0BTlH-46G2ldGWE"; // STATIC TOKEN, YOU HAVE TO CHANGE IT LATER
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
    <div className="main-backdrop"></div>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
