import React from "react";
import { InvoiceList, InvoiceForm } from "../pages/transaction";
import { STATIC_ROUTES } from "./static_routes";
import Dasboard from "../pages/dashboard"
export const PROTECTED_ROUTES = [
  { path: STATIC_ROUTES.DASHBOARD, element: <Dasboard /> },
  { path: STATIC_ROUTES.TRANSACTION.INVOICE, element: <InvoiceList /> },
  { path: STATIC_ROUTES.TRANSACTION.INVOICE_CREATE, element: <InvoiceForm /> },
  {
    path: STATIC_ROUTES.TRANSACTION.INVOICE_SHOW + ":id",
    element: <InvoiceForm readonly={true} />,
  },
  {
    path: STATIC_ROUTES.TRANSACTION.INVOICE_EDIT + ":id",
    element: <InvoiceForm />,
  },
];
