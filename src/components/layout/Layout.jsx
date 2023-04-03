import React from 'react'
import Navbar from '../Landing-Page/Navbar'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default Layout