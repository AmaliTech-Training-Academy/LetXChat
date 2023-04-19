import React from "react";
import UserCard from "./UserCard";
import Search from "./Search";
import CreateGroupSection from "./CreateGroupSection";
import ChatCard from "./ChatCard";
import mno from "../../assets/mno.png";
import kofi from "../../assets/kofi.png";
import ama from "../../assets/ama.png";
import king from "../../assets/king.png";
import mum from "../../assets/mum.png";
import chef from "../../assets/chef.png";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const msgArr = [
  {
    id: 1,
    image: mno,
    mail: "mno@yahoo.com",
    message: "Hello abc!, how are you? I hope everything is good?",
    tim: "06:23",
    no: "1",
  },
  {
    id: 2,
    image: kofi,
    mail: "kofi@gmail.com",
    message: "Chale! wahala dey oo",
    tim: "07:04",
    no: "1",
  },
  {
    id: 3,
    image: ama,
    mail: "ama@yahoo.com",
    message: "Hey you, we have a class at 1pm. Don’t forget",
    tim: "09:17",
    no: "2",
  },
  {
    id: 4,
    image: king,
    mail: "king@gmail.com",
    message: "I done with the design of the house.",
    tim: "11:00",
    no: "2",
  },
  {
    id: 5,
    image: mum,
    mail: "mum@yahoo.com",
    message: "Hello son, get me some drugs on your way home",
    tim: "13:39",
    no: "1",
  },
  {
    id: 6,
    image: chef,
    mail: "chef@gmail.com",
    message: "Buddy, your order is ready for pickup at our office",
    tim: "16:51",
    no: "4",
  },
  {
    id: 7,
    image: mno,
    mail: "mno@yahoo.com",
    message: "Hello abc!, how are you? I hope everything is good?",
    tim: "06:23",
    no: "1",
  },
  {
    id: 8,
    image: kofi,
    mail: "kofi@gmail.com",
    message: "Chale! wahala dey oo",
    tim: "07:04",
    no: "1",
  },
  {
    id: 9,
    image: ama,
    mail: "ama@yahoo.com",
    message: "Hey you, we have a class at 1pm. Don’t forget",
    tim: "09:17",
    no: "2",
  },
  {
    id: 10,
    image: king,
    mail: "king@gmail.com",
    message: "I done with the design of the house.",
    tim: "11:00",
    no: "2",
  },
  {
    id: 11,
    image: mum,
    mail: "mum@yahoo.com",
    message: "Hello son, get me some drugs on your way home",
    tim: "13:39",
    no: "1",
  },
  {
    id: 12,
    image: king,
    mail: "king@gmail.com",
    message: "I done with the design of the house.",
    tim: "11:00",
    no: "2",
  },
  {
    id: 13,
    image: mum,
    mail: "mum@yahoo.com",
    message: "Hello son, get me some drugs on your way home",
    tim: "13:39",
    no: "1",
  },
  {
    id: 14,
    image: king,
    mail: "king@gmail.com",
    message: "I done with the design of the house.",
    tim: "11:00",
    no: "2",
  },
  {
    id: 15,
    image: mum,
    mail: "mum@yahoo.com",
    message: "Hello son, get me some drugs on your way home",
    tim: "13:39",
    no: "1",
  },
  {
    id: 16,
    image: chef,
    mail: "chef@gmail.com",
    message: "Buddy, your order is ready for pickup at our office",
    tim: "16:51",
    no: "4",
  },
];

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
