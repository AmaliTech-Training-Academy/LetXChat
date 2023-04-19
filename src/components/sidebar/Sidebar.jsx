import React from "react";
import UserCard from "./UserCard";
import Search from "./Search";
import ChatCard from "./ChatCard";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

function Sidebar() {
  const { allChatRooms, loading } = useSelector((state) => state.chatrooms);
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate('/')
  }

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
    <div className="mt-[0.5rem] ml-2 cursor-pointer" onClick={handleBackHome}>

      <AiOutlineHome
        style={{
          color: "gray",
          fontSize: "1.5rem",
        }}
        />
        </div>
      <UserCard />
      <Search />
      <div className="w-full h-full mt-8 overflow-y-scroll bg-transparent my-auto flex flex-col gap-4 items-center">
        {allChatRooms.length ? (
          allChatRooms.map((chatroom) => {
            return (
              <div key={chatroom.id}>
                <Link to={`/chat/${chatroom.id}`}>
                  <ChatCard item={chatroom} />
                  {/* <div style={{marginLeft: '2rem'}}>{chatroom.name}</div> */}
                </Link>
              </div>
            );
          })
        ) : (
          <div className="text-black font-bold">No chats yet...</div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
