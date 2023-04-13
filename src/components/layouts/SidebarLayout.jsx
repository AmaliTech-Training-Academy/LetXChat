import React from 'react'
import { Outlet } from 'react-router'
import Settings from '../sidebar/Settings'
import CreateGroup from '../sidebar/CreateGroup'
import Sidebar from '../sidebar/Sidebar'

function SidebarLayout() {
  return (
    <div className='h-screen w-[25vw] bg-[#F3F3F3BF] flex flex-col relative'>
        {/* <Outlet /> */}
        <Sidebar />
        {/* <Settings /> */}
        <CreateGroup />
    </div>
  )
}

export default SidebarLayout