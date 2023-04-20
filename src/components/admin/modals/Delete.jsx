import React from 'react'
import close from "../../../assets/close-svg.svg"
import {hideDeleteModal, getChatrooms} from "../../../feature/adminSlice"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

function Delete() {
  const dispatch = useDispatch()
  const {singleChatroom} = useSelector(state => state.admin)

  const handleDelete = async (e) => {
    e.preventDefault()
    // console.log(singleChatroom.id)
    const response = await axios.delete(`https://letxchat.takoraditraining.com/api/v1/chatrooms/${singleChatroom.id}`)
    // console.log(response)
    if(response.status === 200) {
      toast.success('Chatroom deleted successfully')
      dispatch(getChatrooms())
      dispatch(hideDeleteModal())
    }
    else {
      toast.warning('Chatroom delete unsucessfull');
    }
  }
  return (
    <div className='fixed h-screen w-full bg-[#344054b2] backdrop-blur z-10 flex justify-center items-center'>
      {/* <div className=' w-10 h-10 absolute top-16 right-16 bg-white rounded-lg' onClick={() => dispatch(hideDeleteModal())}>
            <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
        </div> */}
        <div className='w-[400px] bg-slate-100 rounded-lg flex flex-col p-8 justify-center font-semibold relative'>
        <div className=' w-4 h-4 absolute top-6 right-7' onClick={() => dispatch(hideDeleteModal())}>
            <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
        </div>
          <span className=' text-lg'>Delete Chatroom?</span>
          <span className=' text-sm text-[#667085] mt-2'>Deleting chatroom will clear chat content permanently . Are you sure of this?</span>
          <div className='flex justify-between pt-5'>
            <button className=' px-12 py-2 rounded-lg border-2 shadow-sm text-[#344054]' onClick={() => dispatch(hideDeleteModal())}>Cancel</button>
            <button className=' px-14 py-2 bg-[#D92D20] rounded-lg text-white' onClick={handleDelete}>Confirm</button>
          </div>
        </div>
    </div>
  )
}

export default Delete