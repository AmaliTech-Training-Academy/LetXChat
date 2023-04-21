import React, { useEffect, useState } from "react";
import mno from "../../assets/mno.png";
import { useParams } from "react-router";
import { useSelector } from "react-redux";


function ChatCard({item}) {
  const {id} = useParams()
  const {allChatrooms} = useSelector(state => state.chatrooms)
  const [clickedChatroom, setClickedChatroom] = useState(null)
  // console.log(item.recent_message.time);
  const recentMessage = item?.recent_message
  // console.log(recentMessage?.time);
  
  // useEffect(() => {
  //   console.log(clickedChatroom);
  // }, [clickedChatroom])

  return (
    <div className="relative flex items-center w-[280px] gap-5 h-[70px] bg-[#E6E6E6] rounded-xl">
      <div className=" w-14 h-14 rounded-full ml-[3px] cursor-pointer">
        <img src={item.image} alt="" className="w-full h-full object-cover rounded-full" />
      </div>
      <div className="flex flex-1 flex-col gap-1 justify-between h-max cursor-pointer">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{item.name}</span>
          <span className="font-medium text-[10px] mr-1">{recentMessage?.time}</span>
        </div>
        <div className="flex max-w-[200px]">
          <span className="text-[#878787] text-xs">
            {recentMessage?.message.split(" ").length >= 7 ? recentMessage?.message.split(" ").slice(0, 7).join(' ') + '...' : recentMessage?.message}
            </span>
        </div>
      </div>
      <div className="absolute bottom-3 right-3 min-w-max h-3 p-1 bg-[#53352DE5] rounded-full font-semibold text-[9px] text-white flex justify-center items-center">
        {recentMessage?.message.length}
      </div>
    </div>
  );
}

export default ChatCard;
