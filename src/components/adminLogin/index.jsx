import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { adminLoginSchema, loginSchema } from "../../schemas";
import { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { ADMIN_URL } from "../../defaultValues/DefaultValues";
import axios from "axios";
import { Navigate } from "react-router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Container = styled(Box)({
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

const AdminLogin = () => {
  // Show Password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  const [isLoading, setIsLoading] = useState(false);

  // Submit Form
  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    let config = {
      method: "post",
      url: `${ADMIN_URL}`,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      data: values,

    };
    axios(config)
    .then(function(response) {
        setIsLoading(false)
        console.log(response);
        Cookies.set('adminToken', response.data.token)
        const SUCCESS_MESSAGE = response.data.message;
        toast.success(SUCCESS_MESSAGE, {autoClose: 3000,});
    }).catch(error => {
        const ERROR_MESSAGE = error.response.data.message;
        toast.warn(ERROR_MESSAGE);
        console.log(error.response);
    })

    // setTimeout(() => {
    //   actions.resetForm();
    // }, 4000);
  };

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
    validationSchema: adminLoginSchema,
    onSubmit,
  });

  if (Cookies.get("adminToken")) {
    return <Navigate to="/admin-dashboard" />;
  }

  return (
    <Container component="main">
      <FormContainer autoComplete="off" onSubmit={handleSubmit}>
        <Box component="h2" sx={TitleStyle}>
          Admin Log In
        </Box>

        <Box component="section" sx={FieldsContainer}>
          <Box sx={TextComponent}>
            <Box component="label" htmlFor="email">
              email*
            </Box>
            <TextFieldStyle
              type="text"
              id="email"
              name="email"
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
            {isSubmitting ? (
              <LoadingButtonStyles
                loading
                variant="outlined"
              ></LoadingButtonStyles>
            ) : (
              <ButtonStyles type="submit">Log In</ButtonStyles>
            )}
          </Box>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default AdminLogin;
