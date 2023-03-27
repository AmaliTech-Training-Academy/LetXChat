import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import CameraIcon from "../../assets/camera.png";
import styled from "@emotion/styled";

const ContainerStyle = {
  width: "100vw",
  height: "100vh",
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowX: "hidden",
};

const FormContainer = {
  width: "min(900px, 90vw)",
  //   height: "650px",
  height: "min(max-content, 90vh)",
  background: "#FFFFFF",
  boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
};

const TitleStyle = {
  fontFamily: "Inter",
  fontWeight: "700",
  fontSize: "22.2944px",
  lineHeight: "27px",
  color: "#53352D",
  textAlign: "center",
  textTransform: "uppercase",
  marginTop: "54px",
  marginBottom: "27px",
};

const ProfileStyle = {
  marginInline: "auto",
  width: "max-content",
  position: "relative",
  marginBottom: "27px",
};

const FormStyles = {
  paddingInline: "44px",
};

const FieldsContainer = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
  },
  gap: "30px",
};

const TextComponent = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const TextFieldStyle = styled(TextField)`
  color: "green";
`;

const SignUpLogin = {
  width: "100%",
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: "1rem",
  marginBottom: "2rem",
};

const SignUp = () => {
  // Show Password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
    <Box component="main" sx={ContainerStyle}>
      <Box component="section" sx={FormContainer}>
        <Box component="h2" sx={TitleStyle}>
          Sign up
        </Box>

        <Box sx={ProfileStyle}>
          <Avatar sx={{ height: "70px", width: "70px" }} />
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
              <input hidden accept="image/*" type="file" />

              <img
                style={{ width: "1rem", height: "1rem" }}
                src={CameraIcon}
                alt="camera"
              />
            </IconButton>
          </Box>
        </Box>

        <Box component="form" sx={FormStyles}>
          <Box component="section" sx={FieldsContainer}>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="name">
                Name
              </Box>
              <TextFieldStyle
                required
                id="name"
                placeholder="Enter your full name"
              />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="id">
                Employee ID
              </Box>
              <TextField required id="id" label="Enter your ID" sx={{}} />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="username">
                Username
              </Box>
              <TextField required id="username" label="@Ekowsmith" sx={{}} />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="mail">
                Work Mail
              </Box>
              <TextField
                required
                id="mail"
                type="email"
                inputMode="email"
                label="Example@amalitech.com"
                sx={{}}
              />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="password">
                Password
              </Box>
              <FormControl variant="outlined" required>
                <OutlinedInput
                  id="password"
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
              </FormControl>
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="confirm-password">
                Confirm Password
              </Box>
              <FormControl variant="outlined" required>
                <OutlinedInput
                  id="confirm-password"
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
              </FormControl>
            </Box>
          </Box>

          <Box component="section" sx={SignUpLogin}>
            <Box
              component="button"
              sx={{
                background: "#53352D",
                color: "#FFFFFF",
                // padding: ".8rem 4.5rem",
                width: "15rem",
                marginInline: "auto",
                height: "3rem",
                marginTop: "3rem",
                borderRadius: "9px",
              }}
            >
              Sign Up
            </Box>
            <p>
              Already have an account?{" "}
              <span style={{ color: "#3683F5", cursor: "pointer" }}>Login</span>
              {/* <Link to="/">Login</Link> */}
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
