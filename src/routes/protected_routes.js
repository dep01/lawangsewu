import React from "react";
import { STATIC_ROUTES } from "./static_routes";
import { FormExample, ListExample } from "../pages/example";
import Dashboard from "../pages/dashboard";
export const PROTECTED_ROUTES = [
  { path: STATIC_ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: STATIC_ROUTES.EXAMPLE.LIST, element: <ListExample /> },
  { path: STATIC_ROUTES.EXAMPLE.CREATE, element: <FormExample /> },
  { path: STATIC_ROUTES.EXAMPLE.DETAIL+':id', element: <FormExample readonly={true} /> },
  { path: STATIC_ROUTES.EXAMPLE.EDIT+':id', element: <FormExample /> }
];
