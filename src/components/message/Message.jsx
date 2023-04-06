import { Box, styled } from "@mui/material";
import React, { useEffect, useRef } from "react";
import MessageImage from "../../assets/user-image.png";
import Image from "../../assets/collaboration-section.png";
import io  from "socket.io-client";

const Container = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});

const MessageInfo = styled(Box)({});

const Status = styled(Box)({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#00AC11",
});

const MessageContent = styled(Box)({
  maxWidth: "80%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const TextContainer = styled(Box)({
  background: "#878787",
  padding: "10px 20px",
  borderRadius: "10px",
  color: "#FFFFFF",
  maxWidth: "50%",
  position: "relative",
});

const Time = styled("p")({
  position: "absolute",
  right: "0.4rem",
  bottom: "0.2rem",
  fontSize: '0.7rem',
});

const Text = styled("p")({});

const OwnerContainer = styled(Box)({
  display: "flex",
  gap: "10px",
  flexDirection: "row-reverse",
  alignItems: "center",
  marginBlock: "2rem",
});

const OwnerMessageInfo = styled(Box)({});

const OwnerStatus = styled(Box)({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#FF0000",
});

const OwnerMessageContent = styled(Box)({
  maxWidth: "80%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "flex-end",
});

const OwnerTextContainer = styled(Box)({
  background: "rgba(83, 53, 45, 0.9)",
  padding: "10px 20px",
  borderRadius: "10px",
  color: "#FFFFFF",
  maxWidth: "50%",
  position: "relative",
});

const OwnerTime = styled("p")({
  position: "absolute",
  right: "0.4rem",
  bottom: "0.2rem",
  fontSize: '0.7rem',
});

const OwnerText = styled("p")({});

const Message = () => {

  const CUSTOM_URL = 'http://localhost:4000/chat'
  const socket = io.connect(`${CUSTOM_URL}`)

  const sendMessage = () => { 
    socket.emit() 
  } 

  return (
    <>
      <Container component="article">
        <MessageInfo>
          <img
            src={MessageImage}
            style={{ width: "2.5rem", objectFit: "cover" }}
            alt="User Image"
          />
        </MessageInfo>
        <Status></Status>
        <MessageContent>
          <TextContainer>
            <Text>
              Hello Michael, ddfj fjdklsjkfweoo fjslfksjdfkslfsf eojwjoe jdsklsd
            </Text>
            <Time>02:20</Time>
          </TextContainer>
          <img src={Image} style={{ width: "50%" }} alt="image" />
        </MessageContent>
      </Container>
      <OwnerContainer component="article">
        <OwnerMessageInfo>
          <img
            src={MessageImage}
            style={{ width: "2.5rem", objectFit: "cover" }}
            alt="User Image"
          />
        </OwnerMessageInfo>
        <OwnerStatus></OwnerStatus>
        <OwnerMessageContent>
          <OwnerTextContainer>

          <OwnerText>
            Hello Michael ouisdhfos fjlshfsdfs;lfj;s sdfisjf;skls
          </OwnerText>
          <OwnerTime>02:31</OwnerTime>
          </OwnerTextContainer>
          <img src={Image} style={{ width: "50%" }} alt="image" />
        </OwnerMessageContent>
      </OwnerContainer>
    </>
  );
};

export default Message;
