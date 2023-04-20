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
import { useDispatch } from "react-redux";
import { logout } from "../../feature/userSlice";
import { clearToken } from "../../feature/chatSlice";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

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
  height: "455px",
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
  const [openPassword, setOpenPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogoutFunc = () => {
    dispatch(logout());
    dispatch(clearToken());
    navigate("/");
  };

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
            <img src={ProfilePic} alt="Profile Pic" />
          </div>
          <div className="w-full h-[175px] mt-[30px] shadow-2xl shadow-[rgba(0, 0, 0, 0.25)] rounded-[12px] text-[#101828] pl-[18px] pr-[12px] py-[13px]">
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
            <div className="flex items-center gap-[16px] h-[44px] mb-[13px] cursor-pointer">
              <img src={Password} alt="Password Icon" />
              <div className="pr-[16px] border-b border-b-[#D9D9D9] w-full h-full flex items-center justify-between">
                <p>Password</p>
                <img src={Right} alt="Right Icon" />
              </div>
            </div>
            <div className="flex items-center gap-[16px] h-[44px] mb-[13px] cursor-pointer">
              <img src={Logout} alt="Logout Icon" />
              <div
                onClick={LogoutFunc}
                className="pr-[16px] w-full h-full flex items-center justify-between"
              >
                <p>Logout</p>
              </div>
            </div>
          </div>
          {openGeneral && (
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -350, y: -260 },
                visible: { opacity: 1, x: -239, y: -260 },
              }}
              className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#FFFFFF] h-[520px] w-[600px] rounded-[12px] shadow-x2l p-[2rem] flex flex-col`}
            >
              <div
                onClick={() => setOpenGeneral(false)}
                className="flex justify-end text-[#1570efe6] cursor-pointer"
              >
                Done
              </div>
              <div className="text-[#667085] flex items-center pl-1 h-[44px] w-full border-b border-b-[#D9D9D9]">
                General
              </div>
              <div className="w-[80px] h-[80px] rounded-full mx-auto mt-[14px] relative">
                <img src={ProfilePic} alt="Profile Pic" />
                <div className="absolute right-0 bottom-[2px] border border-[#D1CCCC] flex items-center justify-center bg-white rounded-full cursor-pointer">
                  <img className=" scale-[.7]" src={SignUpCamera} alt="" />
                </div>
              </div>
              <div className=" h-[350px] mt-[24px] mx-[40px]">
                <div className=" flex justify-between mb-[26px]">
                  <div className="w-[220px] text-[14px] flex flex-col gap-[5px]">
                    <p>Name</p>
                    <input
                      className="w-full border active:border-[#1570efe6] hover:border-[#1570efe6] transition duration-300 ease-in-out h-[45px] rounded-[5px] p-[5px] placeholder:text-[12px]"
                      type="text"
                      placeholder="Rose Grebstad"
                    />
                  </div>
                  <div className="w-[220px] text-[14px] flex flex-col gap-[5px]">
                    <p>Work Mail</p>
                    <input
                      className="w-full border active:border-[#1570efe6] hover:border-[#1570efe6] transition duration-300 ease-in-out h-[45px] rounded-[5px] p-[5px] placeholder:text-[12px]"
                      type="email"
                      placeholder="example@amalitech.com"
                    />
                  </div>
                </div>
                <div className=" flex justify-between mb-[26px]">
                  <div className="w-[220px] text-[14px] flex flex-col gap-[5px]">
                    <p>Username</p>
                    <input
                      className="w-full border active:border-[#1570efe6] hover:border-[#1570efe6] transition duration-300 ease-in-out h-[45px] rounded-[5px] p-[5px] placeholder:text-[12px]"
                      type="text"
                      placeholder="RoseGrebstad"
                    />
                  </div>
                  <div className="w-[220px] text-[14px] flex flex-col gap-[5px]">
                    <p>Chat ID</p>
                    <input
                      className="w-full border cursor-pointer h-[45px] rounded-[5px] p-[5px] placeholder:text-[12px]"
                      type="text"
                      readOnly
                      placeholder="Rose Grebstad"
                    />
                  </div>
                </div>
                <div className=" flex justify-between mt-[56px]">
                  <button className="w-[220px] h-[48px] rounded-[10px] bg-[#FFFFFF] hover:bg-[#cecece] transition duration-300 ease-in-out text-[14px] text-[#1570efe6] text-lg">
                    Cancel
                  </button>
                  <button className="w-[220px] h-[48px] rounded-[10px] bg-[#1570ef] hover:bg-[#1d5db6] transition duration-300 ease-in-out text-[14px] text-[#FFFFFF] text-lg">
                    Save
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </Box>
      </StyledModal>
    </div>
  );
};

export default UserSettings;
