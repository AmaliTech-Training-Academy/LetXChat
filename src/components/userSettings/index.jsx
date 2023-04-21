import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material";
import CloseIcon from "../../assets/CloseIcon.png";
import ProfilePic from "../../assets/profile-picture.png";
import General from "../../assets/General.png";
import Password from "../../assets/Password.png";
import Right from "../../assets/Right.png";
import Logout from "../../assets/Logout.png";
import SignUpCamera from "../../assets/SignUpCamera.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../feature/userSlice";
import { clearToken } from "../../feature/chatSlice";
import { useNavigate } from "react-router";
import { RiWechat2Line,  } from "react-icons/ri";
import {  HiOutlineUser } from "react-icons/hi";

import GeneralSettings from "../generalSettings";

const StyledModal = styled(Modal)({
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(52, 64, 84, 0.7)",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "480px",
  width: "478px",
  bgcolor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const UserSettings = ({ openSettings, setOpenSettings }) => {
  const handleClose = () => setOpenSettings(false);
  const [openGeneral, setOpenGeneral] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogoutFunc = () => {
    dispatch(logout());
    dispatch(clearToken());
    navigate("/");
  };

  const userImage = userInfo.image;
  const userChatId = userInfo.chat_id;
  const fullName = userInfo.name

  return (
    <div>
      <StyledModal open={openSettings}>
        <Box component="section" sx={style}>
          <div className="flex justify-end">
            <img
              className="w-[12px] h-[12px] cursor-pointer hover:scale-125 transition duration-[0.3s] ease-in-out hover:rotate-180"
              onClick={handleClose}
              src={CloseIcon}
              alt="Close Icon"
            />
          </div>
          <div className="text-[#667085] flex items-center pl-1 h-[44px] w-full border-b border-b-[#D9D9D9]">
            Settings
          </div>
          <div className="w-[76px] h-[76px] rounded-full mx-auto mt-[14px]">
            <img src={userImage} alt="Profile Pic" />
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
              className="flex items-center gap-[16px] h-[44px] mb-[13px] cursor-pointer"
            >
              <img src={General} alt="General Icon" />
              <div className="pr-[16px] border-b border-b-[#D9D9D9] w-full h-full flex items-center justify-between">
                <p>General</p>
                <img src={Right} alt="Right Icon" />
              </div>
            </div>

            <div
              onClick={LogoutFunc}
              className="flex items-center gap-[16px] h-[44px] mb-[13px] cursor-pointer"
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
        </Box>
      </StyledModal>
    </div>
  );
};

export default UserSettings;
