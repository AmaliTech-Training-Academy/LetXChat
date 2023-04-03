import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/sign-in' element={<Login />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
    </Routes>
  )
}

export default Router