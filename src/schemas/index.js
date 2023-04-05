import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  emailID: Yup.string().required("This field is required"),

  password: Yup.string().required("This field is required"),
});

export const basicSchema = Yup.object().shape({});
