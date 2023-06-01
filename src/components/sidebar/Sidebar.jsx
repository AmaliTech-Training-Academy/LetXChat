import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import Search from "./Search";
import ChatCard from "./ChatCard";

import { useDispatch, useSelector } from "react-redux";
import { Box, Skeleton, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchChatRooms } from "../../feature/chatRooms";
import { setRefresh } from "../../feature/adminSlice";

const Container = styled(Box)({
  height: "100%",
  width: "100%",
  marginBlock: "auto",
  marginTop: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  paddingInline: "10px",
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

function Sidebar({ displaySidebar, setDisplaySidebar }) {
  const [, setMatchedChatrooms] = useState([]);
  const { allChatRooms } = useSelector((state) => state.userChatrooms);
  const { refresh } = useSelector((state) => state.admin);
  const { loading, userInfo } = useSelector((state) => state.user);

  const [newRooms, setNewRooms] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = Cookies.get("userToken");

  useEffect(() => {
    if (refresh) {
      dispatch(fetchChatRooms(userToken));
      dispatch(setRefresh(false));
    }
  }, [refresh]);

  useEffect(() => {
    dispatch(fetchChatRooms(userToken));
  }, []);

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
    <aside
      className={` ${
        displaySidebar ? "w-[100vw] flex z-50" : "w-0 hidden"
       }  backdrop-blur-md  flex-col absolute h-screen lg:hidden lg:static`}
    >
      <div
        className={`${
          displaySidebar ? "w-[70vw] flex z-50" : "w-0 hidden"
        } transition bg-[#f3f3f3] shadow-black shadow-xl duration-300 ease-in-out flex-col absolute h-screen lg:w-[20vw] lg:static`}
      >
        <div
          className="mt-[1rem]  mx-auto cursor-pointer text-sm"
          onClick={handleBackHome}
        >
          <span>&#8592;</span> Back Home
        </div>

        <UserCard />
        {/* <Search setMatchedChatrooms={setMatchedChatrooms} /> */}

        <Container>
          {chatrooms?.length ? (
            chatrooms?.map((chatroom) => {
              return (
                <div key={chatroom?.name}>
                  <Link to={`/chat/${chatroom?.id}`} onClick={() => setDisplaySidebar(false)}>
                    <ChatCard item={chatroom} />
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="text-black font-bold">No chatroom yet...</div>
          )}
        </Container>
      </div>
    </aside>
  );
}

export default Sidebar;
