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
import { FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";
import { AiOutlineCloudDownload } from "react-icons/ai";

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
  bottom: "0",
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
  bottom: "0",
  fontSize: "0.7rem",
});

const OwnerText = styled("p")({
  whiteSpace: "break-spaces",
  padding: "20px",
  paddingTop: "10px",
  borderRadius: "10px",
});

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  // The Focus should always stay at the bottom for Messages
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current?.scrollIntoView();
  }, [allMessages]);

  const { id } = useParams();
  const userToken = Cookies.get("userToken");
  const { userInfo } = useSelector((state) => state.user);
  let username = userInfo.username.slice(1);

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
        sender: user.username,
        sender_image: user.image,
        time: format(new Date(created_at), "p"),
      })
    );

    setAllMessages(chatMessages);
  }, [messages]);

  useEffect(() => {
    // Initialize Pusher Js

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_API_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
      encrypted: true,
    });
    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      
      const newMessage = {...data, 
        time: format(new Date(data.time), 'p')
      
      }
      setAllMessages((allMessages) => [...allMessages, newMessage]);
    });
  }, []);


  useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        setMessages(response.data);
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
            const userImage = el.sender_image;
            const chatImage = el.image;
            const chatVideo = el.video;
            const chatVoiceNote = el.voiceNote;
            const chatFile = el.file;

            // Formatting files

            const maxLength = 15;
            const regex = /(?:\.([^.]+))?$/;
            const fileType = regex.exec(chatFile)[1];

            const longFileName = chatFile?.split("/").pop();
            const fileName =
              longFileName?.length <= maxLength
                ? longFileName
                : longFileName?.substring(0, maxLength - fileType.length - 3) +
                  "..." +
                  fileType;

            let icon;
            if (fileType === "pdf") {
              icon = (
                <FaFilePdf className="text-red-500 bg-white rounded w-[1rem] h-[1.5rem]" />
              );
            } else if (
              fileType === "txt" ||
              fileType === "doc" ||
              fileType === "docx"
            ) {
              icon = (
                <FaFileWord className="text-blue-500 bg-white rounded w-[1rem] h-[1.5rem]" />
              );
            } else if (fileType === "xls" || fileType === "xlsx") {
              icon = (
                <FaFileExcel className="text-green-500 bg-white rounded w-[1rem] h-[1.5rem]" />
              );
            }

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
                        <Author>{el.sender}</Author>
                        <Text>{el.text}</Text>
                        {el.image && (
                          <img
                            src={`${FILE_URL}${chatImage}`}
                            // src={chatImage}
                            style={{
                              marginBottom: "25px",
                              width: "98%",
                              marginInline: "auto",
                              borderRadius: "10px",
                              paddingInline: "5px",
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
                            <video
                              style={{
                                marginBottom: "1.2rem",
                                paddingInline: "5px",
                              }}
                              controls
                            >
                              <source
                                src={`${FILE_URL}${chatVideo}`}
                                type="video/mp4"
                              />
                            </video>
                          </>
                        )}

                        {el.voiceNote && (
                          <audio
                            className="w-full px-[5px] mb-[1.2rem] mt-[-1rem]"
                            controls
                          >
                            <source src={`${FILE_URL}${chatVoiceNote}`} />
                          </audio>
                        )}

                        {el.file && (
                          <div className="text-sm text-zinc-300 flex gap-3 mb-4 px-2 py-1 items-end italic cursor-default bg-[#53352d1f] w-[94%] m-auto rounded">
                            {icon}
                            {fileName}
                            <a
                              href={`${FILE_URL}${chatFile}`}
                              download={chatFile.substring(6)}
                              target="_blank"
                            >
                              <AiOutlineCloudDownload className="text-zinc-200 text-xl hover:scale-125 transition duration-300 ease-in-out cursor-pointer" />
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
                            className="rounded-[10px] mx-auto w-5/6 mb-[25px]"
                            alt="image"
                          />
                        )}

                        {el.video && (
                          <>
                            <p className="mb-[0.5rem] pl-3 text-sm text-zinc-300">
                              Video name:{" "}
                              {chatVideo.substring(7, 30).slice(".", -4)}
                            </p>
                            <video
                              style={{ marginBottom: "1.2rem" }}
                              controls
                              className="px-2"
                            >
                              <source
                                src={`${FILE_URL}${chatVideo}`}
                                type="video/mp4"
                              />
                            </video>
                          </>
                        )}

                        {el.voiceNote && (
                          <>
                            <audio
                              controls
                             
                              style={{ marginBottom: "1.5rem", width: "100%" }}
                              className="px-2"
                            >
                              <source src={`${FILE_URL}${chatVoiceNote}`} />

                            </audio>
                          </>
                        )}

                        {el.file && (
                          <div className="text-sm text-zinc-300 flex gap-3 mb-4 px-2 py-1 items-end italic cursor-default bg-[#53352d1f] w-[94%] m-auto rounded">
                            {icon}
                            {fileName}
                            <a
                              href={`${FILE_URL}${chatFile}`}
                              download={chatFile.substring(6)}
                              target="_blank"
                            >
                              <AiOutlineCloudDownload className="text-zinc-200 text-xl hover:scale-125 transition duration-300 ease-in-out cursor-pointer" />
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
      </>
      <div ref={messagesRef} />
    </div>
  );
};

export default Message;