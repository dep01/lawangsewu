import * as yup from "yup";

  export const FORM_SCHEMA = {  
    
        time:yup.string().required("Required!"),
        name:yup.string().required("Required!"),
        age:yup.number().required("Required!")
  };