import React, { useEffect } from "react";
import {showDeleteModal, showViewUsersModal, getSingleChatroom} from "../../feature/adminSlice"
import { useDispatch, useSelector } from "react-redux";

function Chatroom({item}) {
  const {singleChatroom} = useSelector(state => state.admin)
  const dispatch = useDispatch()

  const viewMembers = (e) => {
    e.preventDefault()
    dispatch(showViewUsersModal())
    dispatch(getSingleChatroom(item.id))
  }
  const deleteChatroom = (e) => {
    e.preventDefault()
    dispatch(showDeleteModal())
    dispatch(getSingleChatroom(item.id))
  }

  useEffect(() => {
   console.log(singleChatroom);
  }, [singleChatroom])

  return (
    <div className="w-full flex justify-between items-center py-4 hover:bg-gray-100">
      <span className="flex-[1.43] font-medium text-[#101828]">
        {item.name}
      </span>
      {/* <span className="flex-[1.43] font-medium text-[#101828] w-[200px] break-words">
        {item.email}
      </span> */}
      <span className="flex-[1.43] font-medium text-[#101828] text-center">
        {item.date_assigned}
      </span>
      {/* <span className="flex-[1.43] font-medium text-[#101828] text-center break-words">
        {item.chatroom}
      </span> */}
      <span className="flex-[1.43] font-medium text-[#101828] text-center">
        {item.members}
      </span>
      <div className="flex-[1.43] flex gap-3 justify-center font-medium text-white">
          <button className="border p-2 rounded-lg bg-blue-300" onClick={viewMembers}>View members</button>
          <button className="border p-2 rounded-lg bg-green-300">Edit</button>
          <button className="border p-2 rounded-lg bg-red-500" onClick={deleteChatroom}>Delete</button>
        {/* <span className={`${item.status === 'Active' ? 'bg-[#ECFDF3]' : 'bg-[#FEF3F2]'}  px-2 p-[2px] rounded-full text-xs cursor-pointer`}>
          
        </span> */}
      </div>
    </div>
  );
}

export default Chatroom;
