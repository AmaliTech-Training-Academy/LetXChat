import React, { useState } from "react";
import ChatroomHeader from "./ChatroomHeader";
import Chatroom from "./Chatroom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import no_data from '../../assets/no-data.svg'
import {chatroomLoader} from '../../svg/Icons'
import GridView from "./GridView";

function Chatrooms({ currentChatrooms }) {
  const { isLoading } = useSelector((state) => state.admin);

  return (
    <div className="mt-11">
      <div className="mb-5 flex justify-between items-center font-bold text-[#101828]">
        <span className="text-2xl">Chatrooms</span>
        <Link to='/admin-dashboard/createchatroom'
          className="px-4 py-2 lg:px-7 lg:py-4 bg-[#5B9BF4E5] rounded-lg font-medium text-white text-2xl"
        >
          Add Chatroom
        </Link>
      </div>
      <div className="w-full shadow hidden lg:block">
        <ChatroomHeader />
        {currentChatrooms?.length > 0 ? currentChatrooms.map((ele) => {
          return <Chatroom key={ele.id} item={ele} />;
        }) : 
        <div className=" h-96 flex flex-col items-center justify-center">
          {isLoading ? 
            chatroomLoader :
          <>
            <img src={no_data} alt="" />
            <span className=" font-semibold">No chatrooms to show</span>
          </>}
        </div>
        }
      </div>
      <div className="w-full grid lg:hidden gap-x-14 gap-y-8 md:grid-cols-2">
        {currentChatrooms?.length > 0 && currentChatrooms.map(chatroom => (
          <GridView key={chatroom.id} chatroom={chatroom}/>
        ))}
      </div>
    </div>
  );
}

export default Chatrooms;
