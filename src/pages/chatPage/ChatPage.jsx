import { Box, styled } from "@mui/material";
import ChatHead from "../../components/chatHead/ChatHead";
import ChatMessage from "../../components/chatMessage/ChatMessage";
import Input from "../../components/input/Input";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import PreviewMessages from "../../components/previewMessages";

const Container = styled(Box)({
  height: "100vh",
  width: '55vw',
  flexDirection: "column",
});

const ChatPage = ({chatRoom}) => {

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate('/chat');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <Container component="main">
      <ChatHead chatRoom={chatRoom} />
      <ChatMessage />
      <Input chatRoom={chatRoom} />
    </Container>
  );
};

export default ChatPage;
