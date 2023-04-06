import { Box, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MessageImage from "../../assets/user-image.png";
import Image from "../../assets/collaboration-section.png";
import { io } from "socket.io-client";

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
  fontSize: "0.7rem",
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
  fontSize: "0.7rem",
});

const OwnerText = styled("p")({});

const Message = ({username}) => {


  const [messages, setMessages] = useState([]);

  // Socket Io
  const CUSTOM_URL = "http://localhost:4000";
  const socket = io.connect(`${CUSTOM_URL}`);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data, "Data received");
      setMessages(data);
    });
  }, [socket]);

  console.log(username, "Message name");

  return (
    <>
      {messages &&
        messages.map((el) => (
          <>
            {el.author !== username && (
              <div key={el.author}>
              <Container component="article">
                <MessageInfo>
                  <img
                    src={MessageImage}
                    style={{ width: "2.5rem", objectFit: "cover" }}
                    alt="User Image"
                  />
                  {console.log(el.author, username)}
                </MessageInfo>
                <Status></Status>
                <MessageContent>
                  <TextContainer>
                    <Text>
                      {el.message}
                    </Text>
                    <Time>{el.date}</Time>
                  </TextContainer>
                  <img src={Image} style={{ width: "50%" }} alt="image" />
                </MessageContent>
              </Container>
              </div>
            )}

            {el.author === username && (
              <div key={el.author}>
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
                    <OwnerText>{el.message}</OwnerText>
                    <OwnerTime>{el.date}</OwnerTime>
                  </OwnerTextContainer>
                  <img src={Image} style={{ width: "50%" }} alt="image" />
                </OwnerMessageContent>
              </OwnerContainer>
              </div>
            )}
          </>
        ))}
        
    </>
  );
};

export default Message;
