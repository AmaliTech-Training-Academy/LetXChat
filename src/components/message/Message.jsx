import { Box, styled } from "@mui/material";
import React from "react";
import MessageImage from "../../assets/user-image.png";
import Image from "../../assets/collaboration-section.png";

const Container = styled(Box)({
  display: "flex",
  gap: "20px",
  alignItems: "center",
});

const MessageInfo = styled(Box)({});

const Status = styled(Box)({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#00AC11",
});

const MessageContent = styled(Box)({
  maxWidth: "80%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Text = styled("p")({
  background: "#878787",
  padding: "10px 20px",
  borderRadius: "10px",
  color: "#FFFFFF",
  maxWidth: '50%'
});

const OwnerContainer = styled(Box)({
  display: "flex",
  gap: "20px",
  flexDirection: "row-reverse",
  alignItems: "center",
  marginBlock: '2rem'
});

const OwnerMessageInfo = styled(Box)({});

const OwnerStatus = styled(Box)({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#FF0000",
});

const OwnerMessageContent = styled(Box)({
  maxWidth: "80%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: 'flex-end'
});

const OwnerText = styled("p")({
  background: "rgba(83, 53, 45, 0.9)",
  padding: "10px 20px",
  borderRadius: "10px",
  color: "#FFFFFF",
  maxWidth: '50%'
});

const Message = () => {
  return (
    <>
      <Container component="article">
        <MessageInfo>
          <img
            src={MessageImage}
            style={{ width: "2.5rem", objectFit: "cover" }}
            alt="User Image"
          />
        </MessageInfo>
        <Status></Status>
        <MessageContent>
          <Text>Hello Michael, ddfj fjdklsjkfweoo fjslfksjdfkslfsf eojwjoe jdsklsd</Text>
          <img src={Image} style={{width: '50%'}} alt="image" />
        </MessageContent>
      </Container>
      <OwnerContainer component="article">
        <OwnerMessageInfo>
          <img
            src={MessageImage}
            style={{ width: "2.5rem", objectFit: "cover" }}
            alt="User Image"
          />
        </OwnerMessageInfo>
        <OwnerStatus></OwnerStatus>
        <OwnerMessageContent>
          <OwnerText>Hello Michael ouisdhfos fjlshfsdfs;lfj;s sdfisjf;skls</OwnerText>
          <img src={Image} style={{width: '50%'}} alt="image" />
        </OwnerMessageContent>
      </OwnerContainer>
    </>
  );
};

export default Message;
