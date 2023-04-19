import React, { useEffect } from "react";
import ChatroomHeader from "./ChatroomHeader";
import Chatroom from "./Chatroom";
import { useDispatch, useSelector } from "react-redux";
import {showAddChatroomModal} from "../../feature/adminSlice"
import { Link } from "react-router-dom";

function Chatrooms({ currentChatrooms }) {
  // const { AddChatroomModalState } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(currentChatrooms);
  // }, []);

  return (
    <div className="mt-11">
      <div className="mb-5 flex justify-between items-center font-bold text-[#101828]">
        <span className="text-2xl">Chatrooms</span>
        <Link to='/admin/createchatroom'
          className="px-7 py-4 bg-[#5B9BF4E5] rounded-lg font-medium text-white text-2xl"
          // onClick={() => dispatch(showAddChatroomModal())}
        >
          Add Chatroom
        </Link>
      </div>
      <div className="w-full p-5 shadow">
        <ChatroomHeader />
        {currentChatrooms && currentChatrooms.map((ele) => {
          return <Chatroom key={ele.id} item={ele} />;
        })}
      </div>
    </div>
  );
}

export default Chatrooms;
