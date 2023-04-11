import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UserImage from "../../assets/user-image.png";
import Search from "../../assets/Search.svg";
import Favorite from "../../assets/Favorite.svg";

const Container = styled(Box)({
  paddingInline: "52px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "73px",
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
  background: "yellow",
});

const Email = styled("a")({
  fontStyle: "bold",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#ACACAC",
});

const Status = styled("div")({
  width: "7px",
  height: "7px",
  borderRadius: "50%",
  background: "#00AC11",
});

const RightSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "21px",
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
        <Status></Status>
      </LeftSection>

      <RightSection>
        <div>
          <img src={Search} style={{ cursor: "pointer" }} alt="Search" />
        </div>
        <div>
          <img src={Favorite} style={{ cursor: "pointer" }} alt="Favorite" />
        </div>
      </RightSection>
    </Container>
  );
};

export default ChatHead;
