import React from 'react'
import UserCard from './UserCard'
import close from '../../assets/Close.png'
import Search from './Search'
import { Link } from 'react-router-dom'

function Settings() {
  return (
    <div className='h-screen w-[25vw] bg-[#F3F3F3BF] flex flex-col relative'>
        <Link to='/sidebar' className='w-8 h-8 bg-[#53352D] rounded-full absolute top-5 right-7 flex justify-center items-center cursor-pointer'>
            <img src={close} alt="" />
        </Link>
        <UserCard settings={true} />
        <div className='w-full h-[77px] border-y mt-[61px] flex items-center'>
            <Search settings={true}/>
        </div>
    </div>
  )
}

export default Settings