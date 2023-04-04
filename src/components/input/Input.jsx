import { Box, styled } from "@mui/material";
import React from "react";
import Mic from "../../assets/Microphone.png";
import Cam from "../../assets/Camera.png";
import Send from "../../assets/Send.png";
import Emoji from "../../assets/Emoji.png";
import Attach from "../../assets/Attach.png";

const Container = styled(Box)({
  height: "12vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  paddingInline: "70px",
});

const InputCon = styled("div")({
  background: "#DCDCDC",
  width: "100%",
  height: "50px",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  paddingLeft: "15px",
  // overflow: 'hidden'
});

const InputText = styled("input")({
  width: "75%",
  paddingLeft: "4px",
  background: "transparent",
  fontStyle: "Bold",
  color: "#FFFFFF",

  "&::placeholder": {
    color: "#FFFFFF",
  },
});

const SendMessage = styled('button')({
  background: "#53352D",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

const Input = () => {
  return (
    <Container component="section">
      <InputCon>
        <img style={{ cursor: "pointer" }} src={Mic} alt="Microphone" />
        <InputText type="text" placeholder="start typing..." />

        <div>
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img style={{ cursor: "pointer" }} src={Attach} alt="Send FIle" />
          </label>
        </div>

        <div>
          <input
            type="file"
            id="image"
            accept="image/*"
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <img style={{ cursor: "pointer" }} src={Cam} alt="" />
          </label>
        </div>

        <img style={{ cursor: "pointer" }} src={Emoji} alt="Emoji" />
        <SendMessage>
          <img src={Send} alt="Send message" />
        </SendMessage>
      </InputCon>
    </Container>
  );
};

export default Input;
