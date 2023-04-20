import React from "react";
import userProfile from "../../assets/sidebar_user.png";
import gear from "../../assets/Gear.svg";
import upload from "../../assets/Upload.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserSettings from "../userSettings";

function UserCard({ settings }) {
  
  const {userInfo} = useSelector(state => state.user)

  // User Settings 
  const [openSettings, setOpenSettings] = useState(false)
  const handleOpen = () => setOpenSettings(true);

  return (
    <div
      className={`${
        settings
          ? `bg-[#ffffff] w-[346px] h-[100px] gap-4 mt-20`
          : `bg-[#EDEDED] w-[300px] h-[100px] justify-between mt-9 cursor-pointer`
      } rounded-xl mx-auto flex items-center`}
    >
      <div
        className={`${
          settings
            ? `w-[70px] h-[70px] ml-[23px] relative`
            : `w-[85px] h-[90px] ml-[10px]`
        } rounded-full`}
      >
        <img
          src={userInfo?.image}
          alt="User Profile"
          className="w-full h-full object-contain"
        />
        {settings && (
          <>
            <input type="file" id="profile_photo" accept="image/*" hidden/>
            <label htmlFor="profile_photo" className="bg-black absolute rounded bottom-[2px] -right-[1px] cursor-pointer">
              <img src={upload} alt="" className="" />
            </label>
          </>
        )}
      </div>
      <div className="flex flex-col">
        <span className={`${settings ? "font-bold" : "font-medium text-xs"}`}>
          {userInfo?.email}
        </span>
        {settings && <span className="text-[#878787]">@username</span>}
      </div>
      {!settings && (
        <div onClick={handleOpen}>
          <img
            src={gear}
            alt="User Profile"
            className="w-[24px] h-[25px] object-contain mr-[10px]"
          />
        </div>
      )}

        {/* User Settings Modal  */}
        <UserSettings openSettings={openSettings} setOpenSettings={setOpenSettings}  />

    </div>
  );
}

export default UserCard;
