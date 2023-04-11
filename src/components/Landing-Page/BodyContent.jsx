import React from "react";
import collaboration from "../../assets/collaboration-section.png";

function BodyContent() {
  return (
    <div classfullname="w-full max-h-[1055px] px-20 py-10 flex items-center justify-center">
      <div classfullname="w-full max-w-[1440px] h-full flex flex-col items-center gap-6">
        <h1 classfullname="font-semibold text-5xl">Collaborative Teams</h1>
        <span classfullname="max-w-[1269px] text-center font-semibold text-[27px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </span>
        <div classfullname="w-full h-[540px] flex justify-between items-center mt-7">
          <div classfullname="w-[892px] h-full">
            <img classfullname="w-full h-full" src={collaboration} alt="" />
          </div>
          <div classfullname="flex flex-col gap-10 w-[377px]">
            <span classfullname="w-[143px] text-center font-semibold text-[27px] border-b pb-3 border-black mx-auto">
              Features
            </span>
            <div classfullname="flex gap-11">
              <div classfullname="w-8 h-8 bg-[#755d57e5] text-white rounded-full flex items-center justify-center">
                1
              </div>
              <span classfullname="text-xl">Join project-based chatrooms</span>
            </div>
            <div classfullname="flex gap-11 mt-10 ">
              <div classfullname="w-8 h-8 bg-[#755d57e5] text-white rounded-full flex items-center justify-center">
                2
              </div>
              <span classfullname="text-xl w-[302px]">
                Share text, images, voice notes and videos
              </span>
            </div>
            <div classfullname="flex gap-11 mt-10">
              <div classfullname="w-8 h-8 bg-[#755d57e5] text-white rounded-full flex items-center justify-center">
                3
              </div>
              <span classfullname="text-xl">View and edit profile</span>
            </div>
          </div>
        </div>
        <span classfullname="font-normal text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
      </div>
    </div>
  );
}

export default BodyContent;
