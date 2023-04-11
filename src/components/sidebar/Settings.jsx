import React from 'react'
import UserCard from './UserCard'
import close from '../../assets/Close.png'
import Search from './Search'
import { Link } from 'react-router-dom'

function Settings() {
  return (
    <>
        <Link to='/sidebar' className='w-8 h-8 bg-[#53352D] rounded-full absolute top-5 right-7 flex justify-center items-center cursor-pointer'>
            <img src={close} alt="" />
        </Link>
        <UserCard settings={true} />
        <div className='w-full h-[77px] border-y mt-[61px] flex items-center'>
            <Search settings={true}/>
        </div>
        <button className='bg-[#53352DE5] text-white text-xs px-3 py-2 rounded-lg w-max mt-10 ml-10'>invite a friend</button>
        <button className='bg-[#FF0000] text-white text-xs px-3 py-2 rounded-lg w-max mt-10 ml-10'>delete account</button>
    </>
  )
}

export default Settings