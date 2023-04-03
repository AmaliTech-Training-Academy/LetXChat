import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const usernameRules = /^[a-zA-Z0-9_]+$/;
const usernameUnderscoreRules = /^[a-zA-Z0-9](?:_?[a-zA-Z0-9])*[a-zA-Z0-9]$/;
const amalitechemail =
  /^[a-zA-Z0-9]+([-][a-zA-Z0-9]+)?(\.[a-zA-Z0-9]+)+@amalitech\.com$/;

export const basicSchema = yup.object().shape({
  image: yup.mixed().required("This field is required"),
  // .test('fileType', 'The image field must be a file of type: jpeg, png, jpg, gif, svg', (value) => {
  //   if (!value) {
  //     return true;
  //   }
  //   return ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'].includes(value.type);
  // }),

  fullname: yup.string().trim().required("This field is required"),
  employee_id: yup.string().trim().required("This field is required"),
  username: yup
    .string()
    .trim()
    .matches(usernameRules, {
      message: " Please use only letters, numbers, and underscores",
    })
    .matches(usernameUnderscoreRules, {
      message: "Underscore should be in the middle",
    })
    .required("This field is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .matches(amalitechemail, {
      message: "email address must be from amalitech domain",
    })
    .required("This field is required"),
  password: yup
    .string()
    .trim()
    .min(8)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("This field is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("This field is required"),
});

export const loginSchema = yup.object().shape({});
