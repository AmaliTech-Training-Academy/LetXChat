
import React from "react";
import { Outlet } from "react-router";

import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import DesktopSidebar from "../components/sidebar/DesktopSidebar";



const ChatComponent = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

 
  
  return (
    <section className=" w-screen h-screen flex">
      <button
        onClick={() => setDisplaySidebar(!displaySidebar)}
        className="block lg:hidden absolute top-4 left-4 bg-black text-white p-[3px] z-[60] rounded-full"
      >
        {displaySidebar ? <AiOutlineClose /> : <BiMenuAltLeft />}
      </button>

      <DesktopSidebar />
      <Sidebar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
      <div className="chat-component w-full h-full">

       
        <Outlet />
          {/* <div className="h-screen w-screen flex items-center flex-col justify-center">
            <img style={{ width: "70%" }} src={NoMessage} alt="no message" />
<p className="text-zinc-400">Select a chatroom to continue...</p>
          </div> */}
    
      </div>
    </section>
  );
};

export default ChatComponent;
