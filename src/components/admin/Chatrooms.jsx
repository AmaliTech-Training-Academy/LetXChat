import React from "react";
import ChatroomHeader from "./ChatroomHeader";
import Chatroom from "./Chatroom";

function Chatrooms({currentUsers}) {

  return (
    <div className="w-full mt-11 p-5 shadow">
      <ChatroomHeader />
        {
          currentUsers.map(ele => {
            return (
              <Chatroom key={ele.id} item={ele}/>
            )
          })
        }
    </div>
  );
}

export default Chatrooms;
