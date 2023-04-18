import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import search from '../../assets/admin-search.png'
import admin from '../../assets/admin.png'
import axios from 'axios'
import { useNavigate } from 'react-router'

function AdminNavbar() {
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  const url = 'https://letxchat.takoraditraining.com/api/v1/chatrooms?page='

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await axios(url)
    if(response.ok) {
      return navigate("")
    }
  }

  return (
    <div className='w-full flex justify-between items-center py-4 border-b md:px-11 relative'>
        <div className='flex-1 cursor-pointer'>
            <img src={logo} alt="Logo" />
        </div>
        <div className='md:w-[618px] w-2/5 h-12 bg-[#D9D9D9] rounded mr-9 flex items-center'>
            <img src={search} alt="search" className='w-4 h-4 md:ml-11 ml-3'/>
            <input type="text" placeholder='search...' className='flex-1 bg-transparent md:px-5 px-2 font-medium'/>
        </div>
        <div className='w-[52px] h-[52px] rounded-full bg-red-400 cursor-pointer' onClick={() => setShowProfile(!showProfile)}>
            <img src={admin} alt="admin" className='w-full h-full object-cover'/>
        </div>
        {showProfile && <div className='absolute right-0 top-20 flex flex-col gap-6 bg-gray-50 p-8 rounded-lg'>
          <span>admin@123.com</span>
          <button className='p-3 bg-red-500 rounded-lg' onClick={handleClick}>Log out</button>
        </div>}
    </div>
  )
}

export default AdminNavbar