import React from "react";
import {
  instagram_icon,
  facebook_icon,
  twitter_icon,
  linkedin_icon,
} from "../../svg/Icons";
// import logo from '../../assets/logo.png'

function Footer() {
  return (
    <>
      <div classfullname="w-full h-[455px] bg-[#755D57E5] px-24 flex items-center justify-center text-white">
        <div classfullname="w-full max-w-[1440px] flex justify-between">
          <div>
            <div classfullname="font-semibold text-5xl mb-2">Logo</div>
            {/* <div classfullname='font-black text-3xl w-48 h-11'>
                    <img src={logo} alt="LOGO" classfullname='w-full h-full object-cover'/>
                </div> */}
            <span classfullname=" text-xl">
              Lorem ipsum dolor sit amet
              <br /> consectetur adipiscing{" "}
            </span>
            <div classfullname="flex mt-16 gap-8">
              {instagram_icon}
              {facebook_icon}
              {twitter_icon}
              {linkedin_icon}
            </div>
          </div>
          <div classfullname="flex gap-32 text-2xl">
            <div classfullname="flex flex-col gap-5">
              <span classfullname="font-semibold">Contact</span>
              <span classfullname="opacity-60 hover:underline">email us</span>
              <span classfullname="opacity-60 hover:underline">Company</span>
              <span classfullname="opacity-60 hover:underline">Chat rooms</span>
              <span classfullname="opacity-60 hover:underline">
                How it works
              </span>
            </div>
            <div classfullname="flex flex-col gap-5">
              <span classfullname="font-semibold">Support</span>
              <span classfullname="opacity-60 hover:underline">FAQ’s</span>
              <span classfullname="opacity-60 hover:underline">
                Help center
              </span>
              <span classfullname="opacity-60 hover:underline">Consult</span>
            </div>
            <div classfullname="flex flex-col gap-5">
              <span classfullname="font-semibold">Get in touch</span>
              <span classfullname="opacity-60 hover:underline">
                hello@amalitech.com
              </span>
              <span classfullname="opacity-60 hover:underline">
                +2334567876
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        classfullname="h-20 bg-[#755D57] flex justify-center items-center
     text-white"
      >
        <span>Copyright &copy; Amalitech 2023.All rights reserved.</span>
      </div>
    </>
  );
}

export default Footer;
