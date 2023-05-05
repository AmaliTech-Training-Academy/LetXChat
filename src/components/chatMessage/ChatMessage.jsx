import { Box, styled } from "@mui/material";
import Message from "../message/Message";

const Container = styled(Box)({
  height: "80vh",
  width: "100%",
  paddingInline: "15px",
  paddingBlock: '0.5rem',
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
    <Message />
  </Container>;
};

export default ChatMessage;
