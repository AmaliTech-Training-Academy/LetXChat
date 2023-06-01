import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Sidebar from "../components/sidebar/Sidebar";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import DesktopSidebar from "../components/sidebar/DesktopSidebar";
import { logout } from "../feature/userSlice";
import { clearToken } from "../feature/chatSlice";

const ChatComponent = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Perform user logout function if inactive after an hour
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearToken());
    navigate("/login");
  };

  useEffect(() => {
    const handleMouseOrKeyboardEvent = () => {
      setLastActivity(Date.now());
    };

    document.addEventListener("mouseup", handleMouseOrKeyboardEvent);
    document.addEventListener("keydown", handleMouseOrKeyboardEvent);

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - lastActivity;


      if (diff > 1000 * 60 * 60) {
        console.log('logout');
        handleLogout();
      }
    }, 1000);

    return () => {
      document.removeEventListener("mouseup", handleMouseOrKeyboardEvent);
      document.removeEventListener("keydown", handleMouseOrKeyboardEvent);
      clearInterval(interval);
    };
  }, [lastActivity]); 

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
      </div>
    </section>
  );
};

export default ChatComponent;
