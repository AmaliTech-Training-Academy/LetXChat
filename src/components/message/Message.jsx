import { Box, styled } from "@mui/material";
import React, { useEffect, useRef } from "react";


import { useSelector } from "react-redux";

import { FiDownload } from "react-icons/fi";

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
  width: "48%",
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

const Author = styled("p")({
  color: "#2c2c2c",
  fontSize: "14px",
  margin: "5px",
});

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
  alignItems: "flex-start",
  background: "rgba(83, 53, 45, 0.9)",
  position: "relative",
  color: "#FFFFFF",
  width: "46%",
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
  padding: "5px",
  paddingBottom: "20px",
  borderRadius: "10px",
});

const Message = () => {
  const messages = useSelector((state) => state.chat.messages);

  console.log(messages, "Chat messages");

  // The Focus should always stay at the bottom for Messages
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current?.scrollIntoView();
  }, [messages]);


  return (
    <>
      {messages &&
        messages.map((el) => {
          return (
            <div key={el.id}>
              {!el.sender && (
                <div key={el.sender}>
                  <Container component="article">
                    <MessageInfo>
                      <img
                        // src={}
                        style={{ width: "2.5rem", objectFit: "cover" }}
                        alt="User Image"
                      />
                    </MessageInfo>
                    <MessageContent>
                      <Author>{el.sender}</Author>
                      <Text>{el.text}</Text>
                      {el.image && (
                        <img
                          src={el.image}
                          style={{
                            marginBottom: "25px",
                            width: "98%",
                            marginInline: "auto",
                            borderRadius: "10px",
                          }}
                          alt="image"
                        />
                      )}

                      {el.video && (
                        <video controls>
                          <source
                            src={URL.createObjectURL(el.video)}
                            type="video/mp4"
                          />
                        </video>
                      )}

                      {el.voiceNote && (
                        <audio controls>
                          <source
                            src={URL.createObjectURL(el.voiceNote)}
                            type="audio/mp3"
                          />
                        </audio>
                      )}

                      {el.file && (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            margin: "1rem 0.5rem",
                            marginTop: "0",
                            alignItems: "center",
                          }}
                        >
                          <p>{el.file.name}</p>
                          <a
                            href={URL.createObjectURL(el.file)}
                            download={el.file.name}
                          >
                            <FiDownload
                              style={{ color: "#3683F5", fontSize: "1.5rem" }}
                            />
                          </a>
                        </div>
                      )}

                      <Time>{el.time}</Time>
                    </MessageContent>
                  </Container>
                </div>
              )}

              {el.sender && (
                <div key={el.sender}>
                  <OwnerContainer component="article">
                    <OwnerMessageContent>
                      <OwnerText>{el.text}</OwnerText>
                      {el.image && (
                        <img
                          src={URL.createObjectURL(el.image)}
                          style={{
                            marginBottom: "25px",
                            width: "10rem",
                            // height: '20rem',
                            marginInline: "auto",
                            borderRadius: "10px",
                          }}
                          alt="image"
                        />
                      )}

                      {el.video && (
                        <video controls style={{ marginBottom: "2rem" }}>
                          <p>{el.video.name}</p>
                          <source
                            src={URL.createObjectURL(el.video)}
                            type="video/mp4"
                          />
                        </video>
                      )}

                      {el.voiceNote && (
                        <audio
                          controls
                          src={el.voiceNote}
                          style={{ marginBottom: "2rem" }}
                        >
                          <a href={el.voiceNote} download="recording.ogg">
                            Download Recording
                          </a>
                        </audio>
                      )}

                      {el.file && (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            margin: "1rem 0.5rem",
                            marginTop: "0",
                            alignItems: "center",
                          }}
                        >
                          <p>{el.file.name}</p>
                          <a
                            href={URL.createObjectURL(el.file)}
                            download={el.file.name}
                          >
                            <FiDownload
                              style={{ color: "#3683F5", fontSize: "1.5rem" }}
                            />
                          </a>
                        </div>
                      )}

                      <OwnerTime>{el.time}</OwnerTime>
                    </OwnerMessageContent>
                  </OwnerContainer>
                </div>
              )}
            </div>
          );
        })}
      <div ref={messagesRef} />
    </>
  );
};

export default Message;
