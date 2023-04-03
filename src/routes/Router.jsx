import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import SignUp from '../components/signup/SignUp'
import Login from '../components/login/Login'
import About from '../components/about/About'
import Contact from '../components/contact/Contact'
import Layout from '../components/layout/Layout'
import Sidebar from '../components/sidebar/Sidebar'
function Router() {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/sign-in' element={<Login />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
        </Route>
        <Route path='/sidebar' element={<Sidebar />}/>
    </Routes>
  )
}

export default Router