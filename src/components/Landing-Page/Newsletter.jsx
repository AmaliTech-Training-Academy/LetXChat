import React from "react";

function Newsletter() {
  return (
    <div classfullname="w-full h-44 bg-[#D9D9D9] px-24 flex items-center justify-center">
      <div classfullname="w-full max-w-[1440px] h-16 flex justify-between">
        <div classfullname="font-semibold flex flex-col">
          <span classfullname="text-3xl">Newsletter</span>
          <span classfullname="text-2xl opacity-50">
            Join to get free updates everyweek
          </span>
        </div>
        <div classfullname="w-[622px] h-full text-2xl flex relative rounded-xl bg-white">
          <input
            type="text"
            classfullname="w-[409px] rounded-l-xl h-full px-12"
            placeholder="Enter email address"
          />
          <button classfullname="w-[213px] h-full text-white bg-[#755D57E5] hover:bg-[#53352D] rounded-xl absolute right-0">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
