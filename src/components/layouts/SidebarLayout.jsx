import React from 'react'
import { Outlet } from 'react-router'

function SidebarLayout() {
  return (
    <div className='h-screen w-[25vw] bg-[#F3F3F3BF] flex flex-col relative'>
        <Outlet />
    </div>
  )
}

export default SidebarLayout