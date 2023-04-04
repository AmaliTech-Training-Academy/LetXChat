import { Box, styled } from "@mui/material";
import Messages from "../messages/Messages";

const Container = styled(Box)({
  height: "80vh",
  width: "100%",
  paddingInline: "35px",
  background: "crimson",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "5px",
    backgroundColor: "#F5F5F5",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "5px",
    backgroundColor: "#AAA",
  },
});



const ChatMessage = () => {


  return <Container component="article">
    <Messages />
  </Container>;
};

export default ChatMessage;
