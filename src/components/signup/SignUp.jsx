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
import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import CameraIcon from "../../assets/camera.png";
import ProfilePhoto from "../../assets/profile-picture.png";
import { Field, useFormik } from "formik";
import { basicSchema } from "../../schemas";

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
  width: "min(900px, 90vw)",
  //   height: "min(max-content, 90vh)",
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
  // width: "max-content",
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
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
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
  textTransform: 'capitalize',
  background: "#53352D",
  color: "#FFFFFF",
  width: "15rem",
  marginInline: "auto",
  height: "3rem",
  marginTop: "3rem",
  borderRadius: "9px",
  "&:hover": {
    background: "rgba(83, 53, 45, 0.7)",
    // cursor: disabled ? "not-allowed" : "pointer",
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

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

    // Upload Image 
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileSelection = (event) => {
        const file = event.target.files[0];
        setFieldValue('image', file);
        setPreviewImage(URL.createObjectURL(file));
      };

  //   Submit Form
  const onSubmit = async (values, actions) => {
    // Upload Image
    const reader = new FileReader();
    reader.onload = () => {
      document
        .getElementById("image-preview")
        .setAttribute("src", reader.result);
    };

    console.log("picture", values.image);

    if (values.image) {
        reader.readAsDataURL(values.image);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000))
    actions.resetForm();
};

//   Formik Validation
const {
    values,
    errors,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
      initialValues: {
      image: "",
      name: "",
      employeeID: "",
      username: "",
      mail: "",
      password: "",
      confirmPassword: "",
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
            <Avatar sx={{ height: "70px", width: "70px" }} src={previewImage} alt="Image Upload" />
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
                  value={undefined}

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
              <Box component="label" htmlFor="name">
                Name*
              </Box>
              <TextFieldStyle
                id="name"
                placeholder="Enter your full name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="employeeID">
                Employee ID*
              </Box>
              <TextFieldStyle
                id="employeeID"
                placeholder="Enter your ID"
                value={values.employeeID}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.employeeID && Boolean(errors.employeeID)}
                helperText={touched.employeeID && errors.employeeID}
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
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="mail">
                Work Mail*
              </Box>
              <TextFieldStyle
                id="mail"
                type="text"
                inputMode="email"
                placeholder="Example@amalitech.com"
                value={values.mail}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.mail && Boolean(errors.mail)}
                helperText={touched.mail && errors.mail}
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
              <Box component="label" htmlFor="confirmPassword">
                Confirm Password*
              </Box>
              <PasswordField variant="outlined">
                <OutlinedInput
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="confirm-password"
                        onClick={handleShowConfirmPassword}
                      >
                        {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {" "}
                  {touched.confirmPassword && errors.confirmPassword}
                </FormHelperText>
              </PasswordField>
            </Box>
          </Box>

          <Box component="section" sx={SignUpLogin}>
            <ButtonStyles type="submit">
              Sign Up
            </ButtonStyles>
            <p>
              Already have an account?{" "}
              <span style={{ color: "#3683F5", cursor: "pointer" }}>Login</span>
              {/* <Link to="/">Login</Link> */}
            </p>
          </Box>
        </Box>
      </FormContainer>
    </Box>
  );
};

export default SignUp;
