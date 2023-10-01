import * as yup from "yup";

export const FORM_SCHEMA = {
  email: yup.string().required("Required").email(),
  password: yup.string().required("Required").min(8),
};