import { Box, styled } from "@mui/material";
import ChatHead from "../../components/chatHead/ChatHead";
import ChatMessage from "../../components/chatMessage/ChatMessage";
import Input from "../../components/input/Input";

const Container = styled(Box)({
  height: "100vh",
  width: '55vw',
  flexDirection: "column",
});

const ChatPage = () => {


  return (
    <Container component="main">
      <ChatHead />
      <ChatMessage />

      <Input />
    </Container>
  );
};

export default ChatPage;
