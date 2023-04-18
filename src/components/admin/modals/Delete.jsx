import React from 'react'
import close from "../../../assets/close-button.png"
import {hideDeleteModal} from "../../../feature/adminSlice"
import { useDispatch } from 'react-redux'

function Delete() {
  const dispatch = useDispatch()
  return (
    <div className='fixed h-screen w-full bg-[#344054b2] backdrop-blur z-10 flex justify-center items-center'>
      <div className=' w-10 h-10 absolute top-16 right-16 bg-white rounded-lg' onClick={() => dispatch(hideDeleteModal())}>
            <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
        </div>
        <div className='w-[600px] bg-slate-100 rounded-lg flex flex-col p-8 justify-center items-center font-semibold'>
          <span className=' text-lg'>Are you sure you want to delete this chatroom?</span>
          <div className='flex gap-8 pt-5'>
            <button className=' px-8 py-3 bg-blue-500 rounded-lg text-white' onClick={() => dispatch(hideDeleteModal())}>Cancel</button>
            <button className=' px-8 py-3 bg-red-500 rounded-lg text-white'>Confirm</button>
          </div>
        </div>
    </div>
  )
}

export default Delete