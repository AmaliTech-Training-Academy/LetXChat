import React, { useState } from "react";
import UserCard from "./UserCard";
import Search from "./Search";
import ChatCard from "./ChatCard";

import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [, setMatchedChatrooms] = useState([])
  const { allChatRooms } = useSelector((state) => state.chatrooms);
  const { loading, userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };
  const username = userInfo?.name;

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "25vw",
          height: "100vh",
          position: "absolute",
          top: "0",
          left: "0",
          background: "#FFFFFF",
        }}
      >
        <Skeleton animation="wave" variant="rounded" height={"100vh"} />
      </div>
    );
  }

  return (
    <>
      <div
        className="mt-[1rem] ml-2 cursor-pointer text-sm"
        onClick={handleBackHome}
      >
        <span>&#8592;</span> Back Home
      </div>

      <UserCard />
      <Search setMatchedChatrooms={setMatchedChatrooms}/>
      <div className="w-full h-full mt-8 overflow-y-scroll bg-transparent my-auto flex flex-col gap-4 items-center">
        {allChatRooms?.length ? (
          allChatRooms?.map((chatroom) => {
            const matchingMember = chatroom.members.find(
              (member) => member.name === username
            );
            if (matchingMember) {
              return (
                <div key={chatroom?.name}>
                  <Link to={`/chat/${chatroom?.id}`}>
                    <ChatCard item={chatroom} />
                  </Link>
                </div>
              );
            }
          })
        ) : (
          <div className="text-black font-bold">No chatroom yet...</div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
