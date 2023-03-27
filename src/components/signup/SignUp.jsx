import { Box, TextField } from "@mui/material";
import React from "react";

const ContainerStyle = {
  width: "100vw",
  height: "100vh",
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const FormContainer = {
  width: "900px",
  height: "650px",
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
  textAlign: 'center',
  textTransform: 'uppercase',
  marginTop:'54px'
};

const SignUp = () => {
  return (
    <Box component="main" sx={ContainerStyle}>
      <Box component="section" sx={FormContainer}>
        <Box component="h2" sx={TitleStyle}>
          Sign up
        </Box>
        {/* <TextField
          required
          id="outlined-required"
          label="Required"
          placeholder=''
        /> */}
      </Box>
    </Box>
  );
};

export default SignUp;
