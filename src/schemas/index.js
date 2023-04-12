<<<<<<< HEAD
import * as Yup from "Yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const usernameRules = /^[a-zA-Z0-9_]+$/;
const usernameUnderscoreRules = /^[a-zA-Z0-9](?:_?[a-zA-Z0-9])*[a-zA-Z0-9]$/;
const amalitechemail =
  /^[a-zA-Z0-9]+([-][a-zA-Z0-9]+)?(\.[a-zA-Z0-9]+)+@(amalitech\.com|amalitech\.org)$/;

export const basicSchema = Yup.object().shape({
  image: Yup.mixed().required("This field is required"),

  fullname: Yup.string().trim().required("This field is required"),
  username: Yup.string()
    .trim()
    .matches(usernameRules, {
      message: " Please use only letters, numbers, and underscores",
    })
    .matches(usernameUnderscoreRules, {
      message: "Underscore should be in the middle",
    })
    .required("This field is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .matches(amalitechemail, {
      message: "email address must be from amalitech domain",
    })
    .required("This field is required"),
  password: Yup.string()
    .trim()
    .min(8)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("This field is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("This field is required"),
});

export const loginSchema = Yup.object().shape({
  emailID: Yup.string().required("This field is required"),

  password: Yup.string().required("This field is required"),
});
=======
import * as Yup from "yup";

// Amalitech Email
const amalitechemail = /^[a-zA-Z0-9]+([-][a-zA-Z0-9]+)?(\.[a-zA-Z0-9]+)+@amalitech\.com$/;// Validate email

export const loginSchema = Yup.object().shape({
  emailID: Yup.string()
    .required("Email or ID is required")
    .transform((value, originalValue) => {
      const [email, id] = originalValue.split(",");
      return email;
    })
    .test("email-or-id", "Please enter a valid email or ID", (value) => {
      const email = value;



      const isEmailValid = amalitechemail.test(email);

      // Validate ID
      const idRegex = /^[A-Za-z0-9]+$/;
      const isIdValid = idRegex.test(id);

      return isEmailValid || isIdValid;
    }),

  password: Yup.string().trim().min(8).required("This field is required"),
});

export const basicSchema = Yup.object().shape({});
>>>>>>> 6a0da87 (Feature/Login: Working on integrating backend with frontend)
