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
