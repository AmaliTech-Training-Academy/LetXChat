import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { loginSchema } from "../../schemas";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../feature/authActions";
import Cookies from "js-cookie";

const Container = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const FormContainer = styled("form")({
  width: "min(530px, 90vw)",
  height: "602px",
  background: "rgba(255, 255, 255, 0.6)",
  boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  // padding: { xs: "20px", sm: "68px" },
  paddingInline: "min(68px, 20px)",
  paddingTop: "68px",
});

const TitleStyle = {
  fontFamily: "Inter",
  fontWeight: "700",
  fontSize: "22.2944px",
  lineHeight: "27px",
  color: "#53352D",
  textAlign: "center",
  textTransform: "uppercase",
  marginBottom: "20px",
};

const FieldsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: { xs: "20px", sm: "30px" },
};

const TextComponent = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const TextFieldStyle = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",

    "& fieldset": {
      borderColor: "rgba(83, 53, 45, 0.9)",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #1570EF",
    },

    "& ::placeholder": {
      color: "rgba(0, 0, 0, 0.8)",
    },

    "&:hover fieldset": {
      borderColor: "#1570EF",
    },
    "&.Mui-error fieldset": {
      borderColor: "#FDA29B",
    },
  },
});

const PasswordField = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",

    "& fieldset": {
      borderColor: "rgba(83, 53, 45, 0.9)",
    },
    "& input::placeholder": {
      color: "rgba(0, 0, 0, 0.8)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #1570EF",
    },

    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.8)",
    },

    "&:hover fieldset": {
      borderColor: "#1570EF",
    },
    "&.Mui-error fieldset": {
      borderColor: "#FDA29B",
    },
  },
});

const SignUpLogin = {
  width: "100%",
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: "1rem",
  marginBottom: "2rem",
};

const ButtonStyles = styled(Button)({
  textTransform: "capitalize",
  background: "#53352D",
  color: "#FFFFFF",
  width: "min(20rem, 15rem)",
  marginInline: "auto",
  height: "3rem",
  marginTop: "3rem",
  borderRadius: "9px",
  "&:hover": {
    background: "rgba(83, 53, 45, 0.7)",
  },
});

const LoadingButtonStyles = styled(LoadingButton)({
  textTransform: "capitalize",
  background: "#FFFFFF",
  border: "2px solid #53352D",
  width: "min(20rem, 15rem)",
  marginInline: "auto",
  height: "3rem",
  marginTop: "3rem",
  borderRadius: "9px",
  "&.MuiInput-underline::before": {
    display: "none",
    background: "blue",
    height: "2rem",
    width: "4rem",
  },
});

const Login = () => {
  // Show Password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  const dispatch = useDispatch();
  const { loading, userToken } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // Submit Form
  const onSubmit = async (values, actions) => {
    dispatch(loginUser(values));
    actions.resetForm();
  };


  const Token = Cookies.get('userToken')
 useEffect(() => {
  if (Token) {
setTimeout(() => {

  navigate('/chat')
}, 1000)
  }
 }, [Token])

  // Formik Validation
<<<<<<< HEAD
<<<<<<< HEAD
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });
=======
=======
>>>>>>> 1f9c599f28624041d086643f7a5298a575a526ac
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        emailID: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });
<<<<<<< HEAD
>>>>>>> 23a8a44 (Feature/Login: Integrating the backend with the frontend)
=======
>>>>>>> 1f9c599f28624041d086643f7a5298a575a526ac

  return (
    <Container component="main">
      <FormContainer autoComplete="off" onSubmit={handleSubmit}>
        <Box component="h2" sx={TitleStyle}>
          Log In
        </Box>

        <Box component="section" sx={FieldsContainer}>
          <Box sx={TextComponent}>
            <Box component="label" htmlFor="email">
              email/ Employee ID*
            </Box>
            <TextFieldStyle
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              id="email"
=======
=======
              type="text"
>>>>>>> 23a8a44 (Feature/Login: Integrating the backend with the frontend)
              id="emailID"
              name="emailID"
>>>>>>> 6a0da87 (Feature/Login: Working on integrating backend with frontend)
=======
              type="text"
              id="emailID"
              name="emailID"
>>>>>>> 1f9c599f28624041d086643f7a5298a575a526ac
              placeholder="Enter your email or ID"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box sx={TextComponent}>
            <Box component="label" htmlFor="password">
              Password*
            </Box>
            <PasswordField variant="outlined">
              <OutlinedInput
                id="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="password"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <BsEye /> : <BsEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {" "}
                {touched.password && errors.password}
              </FormHelperText>
              <p
                style={{
                  justifySelf: "flex-end",
                  width: "max-content",
                  position: "absolute",
                  bottom: "-30px",
                  right: "0",
                  color: "#3683F5",
                  cursor: "pointer`",
                }}
              >
                Forgot password?
              </p>
            </PasswordField>
          </Box>

          <Box component="section" sx={SignUpLogin}>
            {loading ? (
              <LoadingButtonStyles
                loading
                variant="outlined"
              ></LoadingButtonStyles>
            ) : (
              <ButtonStyles type="submit">Log In</ButtonStyles>
            )}

            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ color: "#3683F5", cursor: "pointer" }}
              >
                Sign Up
              </Link>
              {/* <Link to="/">Login</Link> */}
            </p>
          </Box>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default Login;
