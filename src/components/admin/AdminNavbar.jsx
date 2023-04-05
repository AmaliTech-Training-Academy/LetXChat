import React from 'react'
import logo from '../../assets/logo.png'
import search from '../../assets/admin-search.png'
import admin from '../../assets/admin.png'

function AdminNavbar() {
  return (
    <div className='w-full flex justify-between items-center py-4 border-b md:px-11'>
        <div className='flex-1 cursor-pointer'>
            <img src={logo} alt="Logo" />
        </div>
        <div className='md:w-[618px] w-2/5 h-12 bg-[#D9D9D9] rounded mr-9 flex items-center'>
            <img src={search} alt="search" className='w-4 h-4 md:ml-11 ml-3'/>
            <input type="text" placeholder='search...' className='flex-1 bg-transparent md:px-5 px-2'/>
        </div>
        <div className='w-[52px] h-[52px] rounded-full bg-red-400'>
            <img src={admin} alt="admin" className='w-full h-full object-cover'/>
        </div>
    </div>
  )
}

export default AdminNavbar