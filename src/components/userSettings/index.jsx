import React from "react";

import CloseIcon from "../../assets/CloseIcon.png";
import ProfilePic from "../../assets/profile-picture.png";
import General from "../../assets/General.png";
import Password from "../../assets/Password.png";
import Right from "../../assets/Right.png";
import Logout from "../../assets/Logout.png";
import SignUpCamera from "../../assets/SignUpCamera.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, openUserSettings } from "../../feature/userSlice";
import { clearToken } from "../../feature/chatSlice";
import { useNavigate } from "react-router";
import { RiWechat2Line,  } from "react-icons/ri";
import {  HiOutlineUser } from "react-icons/hi";

import GeneralSettings from "../generalSettings";
import Cookies from "js-cookie";



const UserSettings = () => {
  const [openGeneral, setOpenGeneral] = useState(false);
  const { userInfo} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogoutFunc = () => {
    dispatch(openUserSettings(false))
    dispatch(logout());
    dispatch(clearToken());
    navigate("/");
  };


  const userChatId = userInfo?.chat_id;
  const fullName = userInfo?.name

  return (
    <div>
      <main className="backdrop-blur-sm h-screen relative w-screen bg-[#3b4555ad] z-10">
        <section className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-max md:h-[480px] w-[90vw] md:w-[478px] bg-white rounded-xl shadow-lg p-3 flex flex-col">
          <div className="flex justify-end">
            <img
              className="w-[12px] h-[12px] cursor-pointer hover:scale-125 transition duration-[0.3s] ease-in-out hover:rotate-180"
              onClick={() => dispatch(openUserSettings(false))}
              src={CloseIcon}
              alt="Close Icon"
            />
          </div>
          <div className="text-[#667085] flex items-center pl-1 h-[44px] w-full border-b border-b-[#D9D9D9]">
            Settings
          </div>
          <div className="w-[76px] h-[76px] rounded-full mx-auto mt-[14px]">
            <img src={userInfo?.image} alt="Profile Pic" />
          </div>

          <div className="w-full h-[210px] mt-[30px] shadow-2xl shadow-[rgba(0, 0, 0, 0.25)] rounded-[12px] text-[#101828] pl-[18px] pr-[12px] pb-[13px]">
            <div className="mx-auto mt-[14px]  flex gap-[16px] items-center h-[40px]">
                <HiOutlineUser className="text-[#667085] text-lg" />
                <p className="cursor-default">Name:</p> <span>{fullName}</span>
            </div>
            <div className="mx-auto flex gap-[16px] items-center h-[44px]">
                <RiWechat2Line className="text-[#667085] text-lg" />
                <p className="cursor-default">Chat ID:</p> <span>{userChatId}</span>
            </div>
            <div
              onClick={() => setOpenGeneral(true)}
              className="flex items-center gap-[16px] h-[44px] mb-[13px] cursor-pointer hover:bg-zinc-100 transition duration-300 ease-in-out"
            >
              <img src={General} alt="General Icon" />
              <div className="pr-[16px] border-b border-b-[#D9D9D9] w-full h-full flex items-center justify-between">
                <p>General</p>
                <img src={Right} alt="Right Icon" />
              </div>
            </div>

            <div
              onClick={LogoutFunc}
              className="flex items-center gap-[16px] h-[44px] mb-[13px] cursor-pointer hover:bg-zinc-100 transition duration-300 ease-in-out"
            >
              <img src={Logout} alt="Logout Icon" />
              <div className="pr-[16px] w-full h-full flex items-center justify-between">
                <p>Logout</p>
              </div>
            </div>
          </div>

          {openGeneral && (
            <GeneralSettings
              openGeneral={openGeneral}
              setOpenGeneral={setOpenGeneral}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default UserSettings;
