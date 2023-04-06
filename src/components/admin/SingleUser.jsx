import React from "react";

function SingleUser({item}) {
  return (
    <div className="w-full flex justify-between mt-12">
      <span className="flex-[1.43] font-medium text-[#101828]">
        {item.name}
      </span>
      <span className="flex-[1.43] font-medium text-[#101828] w-[200px] break-words">
        {item.email}
      </span>
      <span className="flex-[1.43] font-medium text-[#101828] text-center">
        {item.date_assigned}
      </span>
      <span className="flex-[1.43] font-medium text-[#101828] text-center break-words">
        {item.chatroom}
      </span>
      <span className="flex-[1.43] font-medium text-[#101828] text-center">
        {item.members}
      </span>
      <div className={`${item.status === 'Active' ? 'text-[#027A48]' : 'text-[#B42318]'} flex-[1.43] font-medium text-center`}>
        <span className={`${item.status === 'Active' ? 'bg-[#ECFDF3]' : 'bg-[#FEF3F2]'}  px-2 p-[2px] rounded-full text-xs cursor-pointer`}>{item.status}</span>
      </div>
    </div>
  );
}

export default SingleUser;
