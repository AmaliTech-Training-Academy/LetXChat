import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import CameraIcon from "../../assets/SignUpCamera.png";
import ProfilePhoto from "../../assets/profile-picture.png";
import { useFormik } from "formik";
import { basicSchema } from "../../schemas";
import RegModal from "../regModal/RegModal";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../feature/authActions";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ContainerStyle = {
  width: "100vw",
  height: "100vh",
  background: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  overflowX: "hidden",
  padding: "5rem",
};

const FormContainer = styled("form")({
  width: "min(850px, 90vw)",
  height: "max-content",
  background: "#FFFFFF",
  boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
});

const TitleStyle = {
  fontFamily: "Inter",
  fontWeight: "700",
  fontSize: "22.2944px",
  lineHeight: "27px",
  color: "#53352D",
  textAlign: "center",
  textTransform: "uppercase",
  marginTop: "54px",
  marginBottom: "20px",
};

const ProfileStyle = {
  marginInline: "auto",
  position: "relative",
  marginBottom: "27px",
  height: "70px",
  width: "70px",
  background: `url(${ProfilePhoto})`,
  backgroundSize: "cover",
  borderRadius: "50%",
};

const FormStyles = {
  paddingInline: { xs: "20px", sm: "44px" },
};

const FieldsContainer = {
  display: "flex",
  flexWrap: 'wrap',
  gap: { xs: "20px", sm: "30px" },
};

const TextComponent = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: '48%'
};

const EmailComponent = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: '100%'
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
  width: "15rem",
  marginInline: "auto",
  height: "3rem",
  marginTop: "3rem",
  borderRadius: "9px",
  "&:hover": {
    background: "rgba(83, 53, 45, 0.7)",
  },

  "&.MuiInput-underline::before": {
    display: "none",
    background: "blue",
    height: "2rem",
    width: "4rem",
  },
});

const SignUp = () => {
  // Show Password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  const [showpassword_confirmation, setShowpassword_confirmation] =
    useState(false);
  const handleShowpassword_confirmation = () =>
    setShowpassword_confirmation((show) => !show);

  // Upload Image
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileSelection = (event) => {
    setImagePreview(event.target.files[0]);
    setFieldValue("image", event.target.files[0]);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success } = useSelector((state) => state.auth);

  //   Submit Form
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // transform email string to lowercase to avoid case sensitivity issues in login
    values.email = values.email.toLowerCase();


    // actions.resetForm();


    dispatch(registerUser(values));
  };

useEffect(() => {
    // redirect user to confirmation modal if registration was successful
    if (success) {
      navigate("/signup/signupmodal");

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  }, [navigate, success]);

  //   Formik Validation
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  } = useFormik({
    initialValues: {
      image: "",
      fullname: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <Box component="main" sx={ContainerStyle}>
      <FormContainer autoComplete="off" onSubmit={handleSubmit}>
        <Box component="h2" sx={TitleStyle}>
          Sign up
        </Box>
        <Box sx={{ width: "100%", height: "max-content", textAlign: "center" }}>
          <Box sx={ProfileStyle}>
          
          {
            imagePreview && <Avatar
            sx={{ height: "70px", width: "70px" }}
            src={URL.createObjectURL(imagePreview)}
            alt="Image Upload"
          />
          }
            
            <Box
              sx={{
                position: "absolute",
                right: "-12px",
                bottom: "0",
                background: "#FFFFFF",
                borderRadius: "50%",
              }}
            >
              <IconButton aria-label="upload picture" component="label">
                <input
                  hidden
                  id="image"
                  name="image"
                  accept="image/*"
                  type="file"
                  // value={undefined}
                  onChange={handleFileSelection}
                  onBlur={handleBlur}
                />

                <img
                  style={{ width: "1rem", height: "1rem" }}
                  src={CameraIcon}
                  alt="camera"
                />
              </IconButton>
            </Box>
          </Box>

          {errors.image && touched.image && (
            <Box
              sx={{
                color: "#d32f2f",
                fontSize: "0.75rem",
                fontWeight: "400",
                marginBottom: "1rem",
                marginTop: "-1rem",
              }}
            >
              {errors.image}
            </Box>
          )}
        </Box>

        <Box component="section" sx={FormStyles}>
          <Box component="section" sx={FieldsContainer}>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="fullname">
                Fullname*
              </Box>
              <TextFieldStyle
                id="fullname"
                placeholder="Enter your full full name"
                value={values.fullname}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.fullname && Boolean(errors.fullname)}
                helperText={touched.fullname && errors.fullname}
              />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="username">
                Username*
              </Box>
              <TextFieldStyle
                id="username"
                placeholder="@Ekowsmith"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Box>
            <Box sx={EmailComponent}>
              <Box component="label" htmlFor="email">
                Work Email*
              </Box>
              <TextFieldStyle
                id="email"
                type="text"
                inputMode="email"
                placeholder="Example@amalitech.com"
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
              </PasswordField>
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="password_confirmation">
                Confirm Password*
              </Box>
              <PasswordField variant="outlined">
                <OutlinedInput
                  id="password_confirmation"
                  value={values.password_confirmation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    touched.password_confirmation &&
                    Boolean(errors.password_confirmation)
                  }
                  type={showpassword_confirmation ? "text" : "password"}
                  placeholder="Repeat your password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="confirm-password"
                        onClick={handleShowpassword_confirmation}
                      >
                        {showpassword_confirmation ? <BsEye /> : <BsEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {" "}
                  {touched.password_confirmation &&
                    errors.password_confirmation}
                </FormHelperText>
              </PasswordField>
            </Box>
          </Box>

          <Box component="section" sx={SignUpLogin}>
            <ButtonStyles type="submit">
              {loading || isSubmitting ? "Loading..." : "Sign Up"}
            </ButtonStyles>
            <p>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#3683F5", cursor: "pointer" }}>
                Login
              </Link>
              {/* <Link to="/">Login</Link> */}
            </p>
          </Box>
        </Box>
      </FormContainer>
    </Box>
  );
};

export default SignUp;
