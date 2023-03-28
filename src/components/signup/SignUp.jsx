import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
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
  height: "70px",
  width: "70px",
  background: `url(${ProfilePhoto})`,
  backgroundSize: "cover",
  borderRadius: "50%",
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

const TextFieldStyle = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",
 
  '& fieldset': {
    borderColor: 'rgba(83, 53, 45, 0.9)',
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #1570EF',
  },

  '& ::placeholder': {
    color: 'rgba(0, 0, 0, 0.8)'
  },

  '&:hover fieldset': {
    borderColor: '#1570EF',
  },
}
})

const PasswordField = styled(FormControl)({
    "& .MuiOutlinedInput-root": {
        borderRadius: "9px",
      
      '& fieldset': {
        borderColor: 'rgba(83, 53, 45, 0.9)',
      },
      '& input::placeholder': {
        color: 'rgba(0, 0, 0, 0.8)', 
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #1570EF',
      },
    
      '& ::placeholder': {
        color: 'rgba(0, 0, 0, 0.8)'
      },
    
      '&:hover fieldset': {
        borderColor: '#1570EF',
      },
    }
})

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
    background: "#53352D",
    color: "#FFFFFF",
    width: "15rem",
    marginInline: "auto",
    height: "3rem",
    marginTop: "3rem",
    borderRadius: "9px",
    '&:hover': {
        background: "rgba(83, 53, 45, 0.7)",
    }    
  
})

const SignUp = () => {
  // Show Password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  // Upload Image
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  // Submit Form
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="main" sx={ContainerStyle}>
      <Box component="form" sx={FormContainer} onSubmit={handleSubmit}>
        <Box component="h2" sx={TitleStyle}>
          Sign up
        </Box>

        <Box sx={ProfileStyle}>
          {selectedImage && (
            <Avatar
              sx={{ height: "70px", width: "70px" }}
              src={URL.createObjectURL(selectedImage)}
              alt="Image Upload"
            />
          )}
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
                accept="image/*"
                type="file"
                required
                onChange={handleImageUpload}
              />

              <img
                style={{ width: "1rem", height: "1rem" }}
                src={CameraIcon}
                alt="camera"
              />
            </IconButton>
          </Box>
        </Box>

        <Box component="section" sx={FormStyles}>
          <Box component="section" sx={FieldsContainer}>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="name">
                Name*
              </Box>
              <TextFieldStyle
                required
                id="name"
                placeholder="Enter your full name"
              />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="id">
                Employee ID*
              </Box>
              <TextFieldStyle required id="id" placeholder="Enter your ID" sx={{}} />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="username">
                Username*
              </Box>
              <TextFieldStyle
                required
                id="username"
                placeholder="@Ekowsmith"
                sx={{}}
              />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="mail">
                Work Mail*
              </Box>
              <TextFieldStyle
                required
                id="mail"
                type="email"
                inputMode="email"
                placeholder="Example@amalitech.com"
                sx={{}}
              />
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="password">
                Password*
              </Box>
              <PasswordField variant="outlined" required>
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
              </PasswordField>
            </Box>
            <Box sx={TextComponent}>
              <Box component="label" htmlFor="confirm-password">
                Confirm Password*
              </Box>
              <PasswordField variant="outlined" required>
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
              </PasswordField>
            </Box>
          </Box>

          <Box component="section" sx={SignUpLogin}>
            <ButtonStyles
              type="submit"
            //   sx={ButtonStyles}
            >
              Sign Up
            </ButtonStyles>
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
