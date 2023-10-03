import React from "react";
import Forbidden from "../pages/Forbidden";
import InternalServerError from "../pages/InternalServerError";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/login/Form";
import { STATIC_ROUTES } from "./static_routes";

export const PUBLIC_ROUTES = [
  { path: STATIC_ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: STATIC_ROUTES.OTHER.NOT_FOUND, element: <NotFound /> },
  { path: STATIC_ROUTES.OTHER.SERVER_ERROR, element: <InternalServerError /> },
  { path: STATIC_ROUTES.OTHER.FORBIDDEN, element: <Forbidden /> }
];
