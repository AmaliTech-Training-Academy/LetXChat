import React from "react";
import ChatroomHeader from "./ChatroomHeader";
import Chatroom from "./Chatroom";

function Chatrooms({currentUsers}) {

  return (
    <div className="mt-11">
      <div className="mb-5 flex justify-between items-center font-bold text-[#101828]">
        <span className="text-2xl">Chatrooms</span>
        <button className="px-10 py-5 bg-green-300 rounded-lg text-white text-lg">Add Chatroom</button>
      </div>
      <div className="w-full p-5 shadow">
        <ChatroomHeader />
          {
            currentUsers.map(ele => {
              return (
                <Chatroom key={ele.id} item={ele}/>
              )
            })
          }
      </div>
    </div>
  );
}

export default Chatrooms;
