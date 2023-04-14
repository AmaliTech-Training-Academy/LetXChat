import { Box, styled } from "@mui/material";
import ChatHead from "../../components/chatHead/ChatHead";
import ChatMessage from "../../components/chatMessage/ChatMessage";
import Input from "../../components/input/Input";

const Container = styled(Box)({
  height: "100vh",
  width: '55vw',
  flexDirection: "column",
});

const ChatPage = ({chatRoom}) => {


  return (
    <Container component="main">
      <ChatHead chatRoom={chatRoom} />
      <ChatMessage />
      <Input />
    </Container>
  );
};

export default ChatPage;
