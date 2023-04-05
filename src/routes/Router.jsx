import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import SignUpLayout from '../layout/signup/SignUpLayout'
import RegModal from '../components/regModal/RegModal'
import SignUp from '../components/signup/SignUp'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<SignUpLayout />}>
          <Route path='/signup/signupmodal' element={<RegModal />}/>
        </Route>
        {/* <Route path='/sign-in' element={<Login />}/> */}
        {/* <Route path='/about' element={<About />}/> */}
        {/* <Route path='/contact' element={<Contact />}/> */}
    </Routes>
  )
}

export default Router