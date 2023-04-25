import { Skeleton, styled } from "@mui/material";
import { Box, display } from "@mui/system";
import React, { useEffect, useState } from "react";
import ChatPage from "../chatPage/ChatPage";
import GroupDetails from "../../components/groupDetails/GroupDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const Container = styled(Box)({
  display: "flex",
  height: "100vh",
});

const Chat = () => {
  const { id } = useParams();
  const { loading } = useSelector((state) => state.user || state.userChatrooms);
  const { allChatRooms } = useSelector((state) => state.userChatrooms);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "50vw",
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "3vh",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1%",
              marginLeft: "1%",
              paddingTop: "1%",
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              height={"30vh"}
              width={"48%"}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              height={"30vh"}
              width={"48%"}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "1%",
              marginLeft: "1%",
              paddingTop: "1%",
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              height={"30vh"}
              width={"48%"}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              height={"30vh"}
              width={"48%"}
            />
          </div>

          <div style={{ display: "flex", gap: "1%", marginLeft: "1%" }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              height={"30vh"}
              width={"48%"}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              height={"30vh"}
              width={"48%"}
            />
          </div>
        </div>
        <div style={{ height: "60vh", width: "24vw" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            height={"100vh"}
            width={"24vw"}
          />
        </div>
      </div>
    );
  }

  const chatRoom = allChatRooms?.find(
    (chatroom) => chatroom.id === parseInt(id)
  );

  return (
    <div>
      <Container>
        <ChatPage chatRoom={chatRoom} />
        <GroupDetails chatRoom={chatRoom} />
      </Container>
    </div>
  );
};

export default Chat;
