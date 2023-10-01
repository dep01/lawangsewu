import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "../pages/dashboard";

import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "./ScrollToTop";
import Main from "../layouts/Main";
import { STATIC_ROUTES } from "./static_routes";
import { PUBLIC_ROUTES } from "./public_routes";
import { PROTECTED_ROUTES } from "./protected_routes";

const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <ToastContainer />
    <Routes>
      {PUBLIC_ROUTES.map((route, index) => {
        return <Route path={route.path} element={route.element} key={index} />;
      })}
      <Route element={<PrivateRoute />}>
        <Route element={<Main />}>
          <Route path="*" element={<Navigate to={STATIC_ROUTES.OTHER.NOT_FOUND} />} />
          <Route element={<Dashboard />} path="/" />
          <Route element={<Dashboard />} path={STATIC_ROUTES.DASHBOARD} />
          {PROTECTED_ROUTES.map((route, index) => {
            return (
              <Route path={route.path} element={route.element} key={index} />
            );
          })}
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
