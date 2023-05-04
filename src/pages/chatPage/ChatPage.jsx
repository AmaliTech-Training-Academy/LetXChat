import { Box, styled } from "@mui/material";
import ChatHead from "../../components/chatHead/ChatHead";
import ChatMessage from "../../components/chatMessage/ChatMessage";
import Input from "../../components/input/Input";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import PreviewMessages from "../../components/previewMessages";
import { useSelector } from "react-redux";

const ChatPage = ({ chatRoom }) => {
  const navigate = useNavigate();
  const { openChatDetails } = useSelector((state) => state.messages);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        navigate("/chat");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <main
      className={`${
        openChatDetails ? "w-[55vw]" : "w-[75vw]"
      } flex flex-col h-[100vh] transition duration-300 ease-in-out`}
    >
      <ChatHead chatRoom={chatRoom} />
      <ChatMessage />
      {/* <PreviewMessages /> */}
      <Input chatRoom={chatRoom} />
    </main>
  );
};

export default ChatPage;
