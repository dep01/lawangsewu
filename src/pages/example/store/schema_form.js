import * as yup from "yup";

export const FORM_SCHEMA = {
  id: yup.number().required(),
  userId: yup.number().required(),
  title: yup.string().required(),
};