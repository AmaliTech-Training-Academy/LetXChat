import React from 'react'

function UserHeader() {
  return (
    <div className='w-full flex justify-between'>
        <span className='flex-[1.43] font-medium text-2xl text-[#101828]'>Name</span>
        <span className='flex-[1.43] font-medium text-2xl text-[#101828]'>Email</span>
        <span className='flex-[1.43] font-medium text-2xl text-[#101828] text-center'>Date Assigned</span>
        <span className='flex-[1.43] font-medium text-2xl text-[#101828] text-center'>Chatroom</span>
        <span className='flex-[1.43] font-medium text-2xl text-[#101828] text-center'>Members</span>
        <span className='flex-[1.43] font-medium text-2xl text-[#101828] text-center'>Status</span>
    </div>
  )
}

export default UserHeader