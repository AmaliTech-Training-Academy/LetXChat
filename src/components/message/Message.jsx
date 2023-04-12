import { Box, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MessageImage from "../../assets/user-image.png";
import Image from "../../assets/collaboration-section.png";
import { io } from "socket.io-client";
import { format } from "date-fns";

const Container = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "1rem",
});

const MessageInfo = styled(Box)({});


const MessageContent = styled(Box)({
  maxWidth: "80%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  // background: '#ffffff',
  width: '48%',
  borderRadius: "10px",
  background: "#878787",
  position: "relative",
  color: "#FFFFFF",
});

const Text = styled("p")({
  whiteSpace: "break-spaces",
  padding: "0 20px",
  paddingBottom: "20px",
});


const Author = styled('p') ({
  color: '#2c2c2c',
  fontSize: '14px',
  margin: '5px'
})

const Time = styled("p")({
  position: "absolute",
  right: "0.4rem",
  bottom: "0.2rem",
  fontSize: "0.7rem",

});


const OwnerContainer = styled(Box)({
  display: "flex",
  gap: "10px",
  flexDirection: "row-reverse",
  alignItems: "center",
  marginBlock: "2rem",
});

const OwnerMessageInfo = styled(Box)({});

const OwnerMessageContent = styled(Box)({
  maxWidth: "80%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "flex-end",
  background: "rgba(83, 53, 45, 0.9)",
  position: "relative",
  color: "#FFFFFF",
  width: '46%',
  borderRadius: "10px",
});



const OwnerTime = styled("p")({
  position: "absolute",
  right: "0.4rem",
  bottom: "0.2rem",
  fontSize: "0.7rem",
});

const OwnerText = styled("p")({
  whiteSpace: "break-spaces",
  padding: "5px 20px",
  paddingBottom: "20px",
  borderRadius: "10px",
});

const Message = ({ username }) => {
  const [messages, setMessages] = useState([]);
 
  // The Focus should always stay at the bottom for Messages 
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current?.scrollIntoView();
  }, [messages]);

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
        messages.map((el) => {
          const formattedTime = format(new Date(el.date), "hh:mm a");
          return (
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
                    </MessageInfo>
                    <MessageContent>
                        <Author>{el.author}</Author>
                        <Text>{el.message}</Text>

                      <img src={Image} style={{marginBottom: '25px', width: '98%', marginInline: 'auto', borderRadius: '10px'}} alt="image" />
                        <Time>{formattedTime}</Time>
                    </MessageContent>
                  </Container>
                </div>
              )}

              {el.author === username && (
                <div key={el.author}>
                  <OwnerContainer component="article">
                    {/* <OwnerMessageInfo>
                      <img
                        src={MessageImage}
                        style={{ width: "2.5rem", objectFit: "cover" }}
                        alt="User Image"
                      />
                    </OwnerMessageInfo> */}
                    <OwnerMessageContent>
                        <OwnerText>{el.message}</OwnerText>
                        <img src={Image} style={{marginBottom: '25px', width: '98%', marginInline: 'auto', borderRadius: '10px'}} alt="image" />
                        <OwnerTime>{formattedTime}</OwnerTime>
                    </OwnerMessageContent>
                  </OwnerContainer>
                </div>
              )}
            </>
          );
        })}
        <div ref={messagesRef} />
    </>
  );
};

export default Message;
