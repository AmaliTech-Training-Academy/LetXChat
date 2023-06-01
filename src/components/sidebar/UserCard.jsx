import React from "react";
import userProfile from "../../assets/sidebar_user.png";
import gear from "../../assets/Gear.svg";
import upload from "../../assets/Upload.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserSettings from "../userSettings";

function UserCard({ settings }) {
  const { userInfo } = useSelector((state) => state.user);

  // User Settings
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpen = () => setOpenSettings(true);

  return (
    <div
      className={` w-[90%]  ${
        settings
          ? `bg-[#ffffff] h-[110px] gap-4`
          : `bg-[#EDEDED]  h-[110px] justify-between mt-9 cursor-pointer`
      } rounded-xl mx-auto flex items-center`}
    >
      <div
        className={`${
          settings ? `w-[70px] h-[70px] ml-[23px]` : ` w-16 ml-2 h-16`
        } rounded-full`}
      >
        <img src={userInfo?.image} alt="User Profile" className="scale-95 w-full h-full object-cover rounded-full" />
      </div>
      <div className="flex flex-col max-w-[200px] break-words">
        <span className={`${settings ? "font-bold" : "font-medium text-xs"}`}>
          {userInfo?.email.length > 20 && userInfo?.email.slice(0, 20) + '...'}
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
      <UserSettings
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
      />
    </div>
  );
}

export default UserCard;
