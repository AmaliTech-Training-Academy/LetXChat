import React from 'react'
import Navbar from '../Landing-Page/Navbar'
import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default MainLayout