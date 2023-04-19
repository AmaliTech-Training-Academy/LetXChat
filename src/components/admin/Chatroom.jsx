import React, { useEffect } from "react";
import {showDeleteModal, showViewUsersModal, showEditChatroomModal, getSingleChatroom, getMembers} from "../../feature/adminSlice"
import { useDispatch, useSelector } from "react-redux";
import edit from '../../assets/edit-icon.svg'
import trash from '../../assets/trash.svg'

function Chatroom({item}) {
  const {singleChatroom} = useSelector(state => state.admin)
  const dispatch = useDispatch()

  const viewMembers = () => {
    dispatch(showViewUsersModal())
    dispatch(getMembers(item.members))
  }
  const deleteChatroom = (e) => {
    // e.preventDefault()
    dispatch(showDeleteModal())
    dispatch(getSingleChatroom(item))
  }
  const editChatroom = () => {
    // e.preventDefault()
    dispatch(showEditChatroomModal())
    dispatch(getSingleChatroom(item))
  }

  // useEffect(() => {
  //  console.log(item);
  // }, [])

  return (
    <div className="w-full flex justify-between items-center py-4 font-medium hover:bg-gray-100">
      <span className="flex-[1.43] font-medium text-[#101828]">
        {item.name}
      </span>
      {/* <span className="flex-[1.43] font-medium text-[#101828] w-[200px] break-words">
        {item.email}
      </span> */}
      <span className="flex-[1.43] text-[#101828] text-center">
        {item.created_at}
      </span>
      {/* <span className="flex-[1.43] text-[#101828] text-center break-words">
        {item.chatroom}
      </span> */}
      <span className="flex-[1.43] text-[#101828] text-center">
        {item.members?.length || '0'}
      </span>
      <div className="flex-[1.43] flex gap-5 justify-center text-white">
          <button className="border p-2 rounded-lg bg-[#5B9BF4] text-xs" onClick={viewMembers}>View members</button>
          <img src={edit} alt="Edit" onClick={editChatroom}/>
          <img src={trash} alt="Delete" onClick={deleteChatroom}/>
          {/* <button className="border p-2 rounded-lg bg-green-300">Edit</button>
          <button className="border p-2 rounded-lg bg-red-500" onClick={deleteChatroom}>Delete</button> */}
        {/* <span className={`${item.status === 'Active' ? 'bg-[#ECFDF3]' : 'bg-[#FEF3F2]'}  px-2 p-[2px] rounded-full text-xs cursor-pointer`}>
          
        </span> */}
      </div>
    </div>
  );
}

export default Chatroom;
