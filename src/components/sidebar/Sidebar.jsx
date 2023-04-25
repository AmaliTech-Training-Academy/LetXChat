import React from "react";
import UserCard from "./UserCard";
import Search from "./Search";
import ChatCard from "./ChatCard";

import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CHATROOMS_URL } from "../../defaultValues/DefaultValues";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { fetchChatRooms } from "../../feature/chatRooms";

function Sidebar() {
  const { allChatRooms } = useSelector((state) => state.userChatrooms);
  const { loading, userInfo } = useSelector((state) => state.user);

  const [newRooms, setNewRooms] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = Cookies.get("userToken");
  useEffect(() => {
    dispatch(fetchChatRooms(userToken));
  }, [dispatch]);

  const handleBackHome = () => {
    navigate("/");
  };

  const username = userInfo?.name;

  useEffect(() => {
    if (allChatRooms.length > 0) {
      const filtered = allChatRooms.filter((chatroom) => {
        const member = chatroom.members.map((member) => member.name);
        return member.includes(username);
      });
      setNewRooms(filtered);
    }
  }, [allChatRooms, username]);


  const chatrooms = newRooms.sort((a, b) => a.name.localeCompare(b.name));

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
        className="mt-[1rem] w-[300px] mx-auto cursor-pointer text-sm"
        onClick={handleBackHome}
      >
        <span>&#8592;</span> Back Home
      </div>

      <UserCard />
      <Search />
      <div className="w-full h-full mt-6 overflow-y-scroll bg-transparent my-auto flex flex-col gap-4 items-center">
        {chatrooms?.length ? (
          chatrooms?.map((chatroom) => {
            return (
              <div key={chatroom?.name}>
                <Link to={`/chat/${chatroom?.id}`}>
                  <ChatCard item={chatroom} />
                </Link>
              </div>
            );
          })
        ) : (
          <div className="text-black font-bold">No chatroom yet...</div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
