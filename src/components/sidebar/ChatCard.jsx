import React from "react";


function ChatCard({item}) {
  const recentMessage = item?.recent_message
// console.log(recentMessage);
console.log(item);

  return (
    <div key={item.name} className="relative flex items-center w-[280px] gap-5 h-[70px] bg-[#E6E6E6] rounded-xl">
      <div className="w-[65px]  bg-red-800 rounded-[50%] ml-[3px] cursor-pointer bg-cover bg-no-repeat bg-center overflow-hidden">
        <img src={item?.image} alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-1 w-full h-max cursor-pointer">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{item?.name}</span>
          <span className="font-medium text-[10px] mr-1">{recentMessage?.time}</span>
        </div>
        <div className="flex max-w-[200px]">
          <span className="text-[#878787] text-xs">{recentMessage?.text}</span>
        </div>
      </div>
      <div className="absolute bottom-3 right-3 min-w-max h-3 p-1 bg-[#53352DE5] rounded-full font-semibold text-[9px] text-white flex justify-center items-center">
        {recentMessage?.message?.length}
      </div>
    </div>
  );
}

export default ChatCard;
