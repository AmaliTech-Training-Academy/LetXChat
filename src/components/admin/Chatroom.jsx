import React from "react";
import {showDeleteModal, showViewUsersModal, showEditChatroomModal, getSingleChatroom} from "../../feature/adminSlice"
import { useDispatch } from "react-redux";
import edit from '../../assets/edit-icon.svg'
import trash from '../../assets/trash.svg'

function Chatroom({item}) {
  const dispatch = useDispatch()

  const viewMembers = () => {
    dispatch(showViewUsersModal())
    dispatch(getSingleChatroom(item))
  }
  const deleteChatroom = (e) => {
    dispatch(showDeleteModal())
    dispatch(getSingleChatroom(item))
  }
  const editChatroom = () => {
    dispatch(showEditChatroomModal())
    dispatch(getSingleChatroom(item))
  }

  return (
    <div className="w-full flex justify-between items-center p-5 font-medium hover:shadow-md">
      <span className="flex-[1.43] font-medium text-[#101828]">
        {item.name}
      </span>
      <span className="flex-[1.43] text-[#101828] text-center">
        {item.created_at}
      </span>
      <span className="flex-[1.43] text-[#101828] text-center">
        {item.members?.length || '0'}
      </span>
      <div className="flex-[1.43] flex gap-5 justify-center text-white">
          <button className="border p-2 rounded-lg bg-[#5B9BF4] text-xs" onClick={viewMembers}>View members</button>
          <img src={edit} alt="Edit" onClick={editChatroom} className=" cursor-pointer"/>
          <img src={trash} alt="Delete" onClick={deleteChatroom} className=" cursor-pointer"/>
      </div>
    </div>
  );
}

export default Chatroom;
