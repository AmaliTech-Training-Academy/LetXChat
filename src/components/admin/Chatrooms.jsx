import React, { useEffect } from "react";
import ChatroomHeader from "./ChatroomHeader";
import Chatroom from "./Chatroom";
import { useDispatch, useSelector } from "react-redux";
import {showAddChatroomModal} from "../../feature/adminSlice"

function Chatrooms({ currentChatrooms }) {
  // const { AddChatroomModalState } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(AddChatroomModalState);
  // }, [AddChatroomModalState]);

  return (
    <div className="mt-11">
      <div className="mb-5 flex justify-between items-center font-bold text-[#101828]">
        <span className="text-2xl">Chatrooms</span>
        <button
          className="px-10 py-5 bg-green-300 rounded-lg text-white text-lg"
          onClick={() => dispatch(showAddChatroomModal())}
        >
          Add Chatroom
        </button>
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
