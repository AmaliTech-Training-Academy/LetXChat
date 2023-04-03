import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import SignUp from '../components/signup/SignUp'
import Login from '../components/login/Login'
import About from '../components/about/About'
import Contact from '../components/contact/Contact'
function Router() {
  return (
    <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
        </Route>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/sign-in' element={<Login />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
    </Routes>
  )
}

export default Router