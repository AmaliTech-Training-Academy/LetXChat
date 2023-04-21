import { Box, styled } from "@mui/material";
import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FiDownload } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router";
import { CHATROOMS_URL, FILE_URL } from "../../defaultValues/DefaultValues";
import Cookies from "js-cookie";
import { useState } from "react";
import { format, formatISO } from "date-fns";
import Pusher from "pusher-js";
import { addMessage } from "../../feature/chatMessageSlice";

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
  overflow: "hidden",
});

const Text = styled("p")({
  whiteSpace: "break-spaces",
  padding: "0 20px",
  paddingBottom: "20px",
});

const Author = styled("p")({
  color: "#252525",
  fontSize: "14px",
  padding: "2px 5px",
  background: "#e2e2e2",
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
  marginBlock: ".5rem",
});

const OwnerMessageInfo = styled(Box)({});

const OwnerMessageContent = styled(Box)({
  maxWidth: "80%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "flex-start",
  background: "rgba(83, 53, 45, 0.7)",
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
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const { pusherMessages } = useSelector((state) => state.chat);
  const PusherMessages = pusherMessages;
  const dispatch = useDispatch();
  // console.log(PusherMessages);

  // The Focus should always stay at the bottom for Messages
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current?.scrollIntoView();
  }, [allMessages]);

  const { id } = useParams();
  const userToken = Cookies.get("userToken");
  const { userInfo } = useSelector((state) => state.user);
  let username = userInfo.name;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${CHATROOMS_URL}/${id}/message`,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  useEffect(() => {
    const chatMessages = sortedMessages.map(
      ({ file, image, text, video, voiceNote, user, created_at }) => ({
        file,
        image,
        text,
        video,
        voiceNote,
        sender: user.fullname,
        sender_image: user.image,
        time: format(new Date(created_at), "p"),
      })
    );

    setAllMessages(chatMessages);
  }, [messages]);

  console.log(allMessages);

  useEffect(() => {
    // Initialize Pusher Js

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_API_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
      encrypted: true,
    });
    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      // dispatch(addMessage([...allMessages, data] ));
      setAllMessages((allMessages) => [...allMessages, data]);
    });
  }, []);

  useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        setMessages(response.data);
        // dispatch(addMessage(response.data))
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });

    messages &&
      messages?.map((el) => {
        return el;
      });
  }, [id]);

  if (!messages) {
    return <div>No message yet</div>;
  }

  return (
    <div>
      <>
        {allMessages &&
          allMessages.map((el, index) => {
            const userImage = el.image;
            const chatImage = el.image;
            const chatVideo = el.video;
            const chatVoiceNote = el.voiceNote;
            const chatFile = el.file;
            return (
              <div key={index} className="text-[0.9rem]">
                {el.sender !== username && (
                  <div key={el.sender}>
                    <Container component="article">
                      <MessageInfo>
                        <img
                          src={`${FILE_URL}${userImage}`}
                          style={{ width: "2.5rem", objectFit: "cover" }}
                          alt="User Image"
                        />
                      </MessageInfo>
                      <MessageContent>
                        <Author>@{el.sender}</Author>
                        <Text>{el.text}</Text>
                        {el.image && (
                          <img
                            src={`${FILE_URL}${chatImage}`}
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
                          <>
                            <p className="mb-[-0.5rem] text-sm text-zinc-300">
                              Video name:{" "}
                              {chatVideo.substring(7, 30).slice(".", -4)}
                            </p>
                            <video style={{ marginBottom: "1.2rem" }} controls>
                              <source
                                src={`${FILE_URL}${chatVideo}`}
                                type="video/mp4"
                              />
                            </video>
                          </>
                        )}

                        {el.voiceNote && (
                          <audio controls>
                            <source
                              src={`${FILE_URL}${chatVoiceNote}`}
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
                            <p className="mb-[-0.5rem] text-sm text-zinc-300">
                              File name: {chatFile.substring(6, 20).split(".")}
                            </p>
                            <a
                              href={`${FILE_URL}${chatFile}`}
                              download={chatFile.substring(6)}
                            >
                              <FiDownload
                                style={{
                                  color: "#3683F5",
                                  fontSize: "1.5rem",
                                }}
                              />
                            </a>
                          </div>
                        )}

                        <Time>{el.time}</Time>
                      </MessageContent>
                    </Container>
                  </div>
                )}

                {el.sender === username && (
                  <div key={username}>
                    <OwnerContainer component="article">
                      <OwnerMessageContent>
                        <OwnerText>{el.text}</OwnerText>
                        {el.image && (
                          <img
                            src={`${FILE_URL}${chatImage}`}
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
                          <>
                            <p className="mb-[-0.5rem] text-sm text-zinc-300">
                              Video name:{" "}
                              {chatVideo.substring(7, 30).slice(".", -4)}
                            </p>
                            <video style={{ marginBottom: "1.2rem" }} controls>
                              <source
                                src={`${FILE_URL}${chatVideo}`}
                                type="video/mp4"
                              />
                            </video>
                          </>
                        )}

                        {el.voiceNote && (
                          <audio
                            controls
                            src={`${FILE_URL}${chatVoiceNote}`}
                            style={{ marginBottom: "2rem" }}
                          >
                            <a
                              href={`${FILE_URL}${chatVoiceNote}`}
                              download="recording.ogg"
                            >
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
                            <p className="mb-[-0.5rem] text-sm text-zinc-300">
                              File name: {chatFile.substring(6, 20).split(".")}
                            </p>
                            <a
                              href={`${FILE_URL}${chatFile}`}
                              download={chatFile.substring(6)}
                            >
                              <FiDownload
                                style={{
                                  color: "#3683F5",
                                  fontSize: "1.5rem",
                                }}
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
    </div>
  );
};

export default Message;
