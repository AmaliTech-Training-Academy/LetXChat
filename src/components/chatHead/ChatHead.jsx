
import React from "react";
import { useNavigate } from "react-router";

const ChatHead = ({ chatRoom }) => {
  const navigate = useNavigate();

  return (
    <section className=" px-2 sm:px-[52px] flex items-center justify-between h-[10vh] border-b border-[#D9D9D9]">
      <div className="flex items-center gap-[26px]">
        <img
          src={chatRoom?.image}
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          alt="Profile pic"
        />
        <h2 className="font-bold text-[18px] leading-[19px] text-[#ACACAC] bg-red-">
          {chatRoom?.name}
        </h2>
      </div>
      <button
        // style={{
        //   background: "gray",
        //   color: "white",
        //   padding: "0.2rem 0.5rem",
        //   borderRadius: "20px",
        //   fontSize: ".7rem",
        // }}
        className="bg-zinc-400 text-white py-[0.2rem] px-[0.5rem] rounded-[20px] text-[0.7rem] sm:text-[0.9rem]"
        onClick={() => navigate("/chat")}
      >
        Go Back
      </button>
    </section>
  );
};

export default ChatHead;
