import React from 'react'
import UserCard from './UserCard'
import close from '../../assets/Close.png'

function Settings() {
  return (
    <div className='h-screen w-[25vw] bg-[#F3F3F3BF] flex flex-col relative'>
        <div className='w-8 h-8 bg-[#53352D] rounded-full absolute top-5 right-7 flex justify-center items-center cursor-pointer'>
            <img src={close} alt="" />
        </div>
        <UserCard settings={true} />
    </div>
  )
}

export default Settings