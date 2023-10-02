import * as yup from "yup";

export const FORM_SCHEMA = {
  no_invoice: yup.string(),
  tanggal_invoice: yup.string(),
  tanggal_batas_akhir: yup.string(),
  total_tagihan: yup.number().required("Ree"),
  note: yup.string(),
};