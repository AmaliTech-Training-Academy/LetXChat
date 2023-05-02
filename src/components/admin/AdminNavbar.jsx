import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import search from '../../assets/admin-search.png'
import admin from '../../assets/admin.png'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

function AdminNavbar({setSearchInput}) {
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("Logout successful")
    navigate("/admin-login")
  }

  return (
    <div className='w-full flex justify-between items-center py-4 border-b md:px-11 relative'>
        <div className='flex-1 cursor-pointer'>
            <img src={logo} alt="Logo" />
        </div>
        <div className='md:w-[618px] w-2/5 h-12 bg-[#D9D9D9] rounded mr-9 flex items-center'>
            <img src={search} alt="search" className='w-4 h-4 md:ml-11 ml-3'/>
            <input type="text" placeholder='search...' className='flex-1 bg-transparent md:px-5 px-2 font-medium' onInput={(e) => setSearchInput(e.target.value)}/>
        </div>
        <div className='w-[52px] h-[52px] rounded-full cursor-pointer' onClick={() => setShowProfile(!showProfile)}>
            <img src={admin} alt="admin" className='w-full h-full object-cover'/>
        </div>
        {showProfile && <div className='absolute right-8 top-20 flex flex-col bg-white shadow-lg rounded-lg'>
          <span className=' p-2 border rounded-t-lg pr-10'>admin@admin.com</span>
          <span className=' p-2 border rounded-b-lg cursor-pointer hover:text-red-500' onClick={logout}>Logout</span>
          {/* <button className='p-3 bg-red-500 rounded-lg' onClick={handleClick}>Log out</button> */}
        </div>}
    </div>
  )
}

export default AdminNavbar