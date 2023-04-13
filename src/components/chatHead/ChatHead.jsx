import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UserImage from "../../assets/user-image.png";


const Container = styled(Box)({
  paddingInline: "52px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "10vh",
  borderBottom: "1px solid #D9D9D9",
});

const LeftSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "26px",
});

const ProfileContainer = styled(Box)({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
});

const Email = styled("a")({
  fontStyle: "bold",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#ACACAC",
});



const ChatHead = () => {


  

  return (
    <Container component="section">
      <LeftSection component="section">
        <ProfileContainer>
          <img
            src={UserImage}
            style={{ width: "100%", height: "100%" }}
            alt="Profile pic"
          />
        </ProfileContainer>
        <Email>kofi@gmail.com</Email>
      </LeftSection>

    </Container>
  );
};

export default ChatHead;
