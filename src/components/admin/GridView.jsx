import React, { useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { showDeleteModal, showViewUsersModal, showEditChatroomModal, getSingleChatroom } from "../../feature/adminSlice"
import {HiUsers} from 'react-icons/hi'
import edit from '../../assets/edit-icon.svg'
import trash from '../../assets/trash.svg'
import { useDispatch } from 'react-redux'

const GridView = ({chatroom}) => {
    const [isClicked, setIsClicked] = useState(false)
    const dispatch = useDispatch()

    const viewMembers = () => {
        dispatch(showViewUsersModal())
        dispatch(getSingleChatroom(chatroom))
        setIsClicked(!isClicked)
      }
      const deleteChatroom = (e) => {
        dispatch(showDeleteModal())
        dispatch(getSingleChatroom(chatroom))
        setIsClicked(!isClicked)
      }
      const editChatroom = () => {
        dispatch(showEditChatroomModal())
        dispatch(getSingleChatroom(chatroom))
        setIsClicked(!isClicked)
      }

  return (
        <div className="w-full h-44 border rounded-xl shadow-lg relative flex items-center gap-5 px-5">
          <div className=" w-7 h-7 bg-gray-100 flex justify-center items-center rounded-full absolute right-5 top-3 cursor-pointer" onClick={() => {setIsClicked(!isClicked)}}>
            <BsThreeDotsVertical style={{opacity: '0.5'}}/>
          </div>
          {isClicked && <div className="p-2 w-max bg-gray-200 flex flex-col gap-2 rounded-lg absolute -right-5 top-11">
            <span className="flex items-center gap-2 text-gray-500" onClick={viewMembers}>
              <HiUsers />
              <span>View Members</span>
            </span>
            <span className="flex items-center gap-2 text-gray-500" onClick={editChatroom}>
              <div className=" w-4 h-4">
              <img src={edit} alt="" className="w-full h-full object-cover"/>
              </div>
              <span>Edit</span>
            </span>
            <span className="flex items-center gap-2 text-gray-500" onClick={deleteChatroom}>
            <div className=" w-4 h-4">
              <img src={trash} alt="" className="w-full h-full object-cover"/>
              </div>
              <span>Delete</span>
            </span>
          </div>}
          <div className=' w-32 h-32 rounded-full'>
            <img src={chatroom.image} alt="" className='w-full h-full object-cover rounded-full' />
          </div>
          <div className='flex flex-col text-gray-800'>
            <span className=' text-2xl font-semibold'>{chatroom.name}</span>
            <span className=''>{chatroom.description}</span>
            <span>{chatroom.created_at}</span>
          </div>
        </div>
  )
}

export default GridView