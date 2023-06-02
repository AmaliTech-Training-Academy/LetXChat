import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Logo from '../assets/logo.png'
import Sidebar from "../components/sidebar/Sidebar";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import DesktopSidebar from "../components/sidebar/DesktopSidebar";
import { logout } from "../feature/userSlice";
import { clearToken } from "../feature/chatSlice";
import UserSettings from "../components/userSettings";

const ChatComponent = () => {
  const { displaySettings } = useSelector((state) => state.user);

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
    <section className=" w-screen h-screen flex relative">
      <button
        onClick={() => setDisplaySidebar(!displaySidebar)}
        className={`block lg:hidden absolute ${!displaySidebar ? 'top-20': 'top-4'} sm:top-4 left-4 bg-black text-white p-[3px] z-[60] rounded-full`}
      >
        {displaySidebar ? <AiOutlineClose className=" text-[20px]" /> : <BiMenuAltLeft className=" text-[20px]" />}
      </button>

      <DesktopSidebar />
      <Sidebar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
      <div className="chat-component w-full h-full z-10">
        <Outlet />
      </div>
      <div className="absolute h-screen w-screen flex items-center justify-center">
<img src={Logo} alt="logo" />
      </div>

      {displaySettings === true 
        && 
        
      <div className="absolute w-screen h-screen z-50">
        <UserSettings />
      </div>
      }
    </section>
  );
};

export default ChatComponent;
