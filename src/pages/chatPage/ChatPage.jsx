import { Box, Skeleton, styled } from "@mui/material";
import ChatHead from "../../components/chatHead/ChatHead";
import ChatMessage from "../../components/chatMessage/ChatMessage";
import Input from "../../components/input/Input";
import { useSelector } from "react-redux";

const Container = styled(Box)({
  height: "100vh",
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
});

const ChatPage = () => {
  const { loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          paddingTop: "1rem",
        }}
      >
        <Skeleton
          variant="circular"
          width={70}
          height={70}
          sx={{ marginLeft: "2.5rem" }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={"100vw"}
          height={"77vh"}
        />
        <Skeleton variant="rectangular" width={"100vw"} height={"14vh"} />
      </div>
    );
  }

  return (
    <Container component="main">
      <ChatHead />
      <ChatMessage />

      <Input />
    </Container>
  );
};

export default ChatPage;
