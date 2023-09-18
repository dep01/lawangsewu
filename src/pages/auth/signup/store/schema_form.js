import * as yup from "yup";

export const SIGNUP_FORM_SCHEMA = {
  email: yup.string().required("Required").min(2),
  password: yup.string().required("Required"),
};