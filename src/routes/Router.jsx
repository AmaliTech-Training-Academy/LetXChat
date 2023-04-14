import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import SignUp from '../components/signup/SignUp'
import Login from '../components/login/Login'
import About from '../components/about/About'
import Contact from '../components/contact/Contact'
import MainLayout from '../components/layouts/MainLayout'
import Sidebar from '../components/sidebar/Sidebar'
import Settings from '../components/sidebar/Settings'
import CreateGroup from '../components/sidebar/CreateGroup'
import SidebarLayout from '../components/layouts/SidebarLayout'
import PrivateRoute from '../PrivateRoute'
import ChatPage from '../pages/chatPage/ChatPage'
function Router() {
  return (
    <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path='/sidebar' element={<SidebarLayout />}>
          <Route index element={<Sidebar />}/>
          <Route path='/sidebar/settings' element={<Settings />}/>
          <Route path='/sidebar/creategroup' element={<CreateGroup />}/>
        </Route>
    </Routes>
  )
}

export default Router