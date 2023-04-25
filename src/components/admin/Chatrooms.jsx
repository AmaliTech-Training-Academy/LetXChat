import React, { useEffect } from "react";
import ChatroomHeader from "./ChatroomHeader";
import Chatroom from "./Chatroom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import no_data from '../../assets/no-data.svg'

function Chatrooms({ currentChatrooms }) {
  const { isLoading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <div className="mt-11">
      <div className="mb-5 flex justify-between items-center font-bold text-[#101828]">
        <span className="text-2xl">Chatrooms</span>
        <Link to='/admin-dashboard/createchatroom'
          className="px-7 py-4 bg-[#5B9BF4E5] rounded-lg font-medium text-white text-2xl"
          // onClick={() => dispatch(showAddChatroomModal())}
        >
          Add Chatroom
        </Link>
      </div>
      <div className="w-full shadow">
        <ChatroomHeader />
        {currentChatrooms?.length > 0 ? currentChatrooms.map((ele) => {
          return <Chatroom key={ele.id} item={ele} />;
        }) : 
        <div className=" h-96 flex flex-col items-center justify-center">
          <img src={no_data} alt="" />
          <span className=" font-semibold">No chatrooms to show</span>
        </div>
        }
      </div>
    </div>
  );
}

export default Chatrooms;
