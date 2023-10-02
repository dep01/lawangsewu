import * as yup from "yup";

export const FORM_SCHEMA = {
  id: yup.number().required("Required!"),
  userId: yup.number().required("Required!"),
  title: yup.string().required("Required!")
};