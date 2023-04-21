import React from 'react'
import { Outlet } from 'react-router'
import Settings from '../components/sidebar/Settings'
import CreateGroup from '../components/sidebar/CreateGroup'
import Sidebar from '../components/sidebar/Sidebar'

function SidebarLayout() {
  return (
    <div className='h-screen w-[25vw] bg-[#F3F3F3BF] flex flex-col relative'>
        <Sidebar />
        {/* <Outlet /> */}
        {/* <Settings /> */}
        {/* <CreateGroup /> */}
    </div>
  )
}

export default SidebarLayout