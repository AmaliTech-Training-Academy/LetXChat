import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import SignUp from "../components/signup/SignUp";
import Login from "../components/login/Login";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import MainLayout from "../layouts/MainLayout";
import Sidebar from "../components/sidebar/Sidebar";
import Settings from "../components/sidebar/Settings";
import CreateGroup from "../components/sidebar/CreateGroup";
import SidebarLayout from "../layouts/SidebarLayout";
import PrivateRoute from "../PrivateRoute";
import Chat from "../pages/chat/Chat";
import ChatComponent from "../pages/ChatComponent";
import SignUpLayout from "../layouts/SignUpLayout";
import RegModal from "../components/regModal/RegModal";
import Admin from '../pages/admin/Admin'
import AdminLayout from '../layouts/AdminLayout'
import NewChatroom from '../components/admin/NewChatroom'
function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUpLayout />}>
          <Route path="/signup/signupmodal" element={<RegModal />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path='/admin/createchatroom' element={<NewChatroom />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <ChatComponent />
          </PrivateRoute>
        }
      >
        <Route path="/chat/:id" element={<Chat />} />
      </Route>
      <Route path="*" element={<MainLayout />} />
    </Routes>
  );
}

export default Router;
