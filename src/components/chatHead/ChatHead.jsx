import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { chatDetails } from "../../feature/chatMessageSlice";

const Container = styled(Box)({
  paddingInline: "52px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "10vh",
  borderBottom: "1px solid #D9D9D9",
});



const Email = styled("a")({
  fontStyle: "bold",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#ACACAC",
});

const ChatHead = ({ chatRoom }) => {
const dispatch = useDispatch()
  const navigate = useNavigate()
  const {openChatDetails} = useSelector(state => state.messages)

const handleChatDetails = () => {
  dispatch(chatDetails(!openChatDetails))
}


  return (
    <Container component="section">
      <button onClick={() => handleChatDetails()} className="flex items-center gap-4">
        <img
          src={chatRoom?.image}
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          alt="Profile pic"
        />
        <Email>{chatRoom?.name}</Email>
      </button>
      <button
        style={{
          background: "gray",
          color: "white",
          padding: "0.2rem 0.5rem",
          borderRadius: "20px",
          fontSize: ".9rem",
        }}
        onClick={() => navigate('/chat')}
      >
        Go Back
      </button>
    </Container>
  );
};

export default ChatHead;
