import React from 'react'
import AdminNavbar from '../admin/AdminNavbar'
import AddChatroomModal from '../admin/modals/AddChatroomModal'
import Delete from '../admin/modals/Delete'
import Users from '../admin/modals/Users'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'

function AdminLayout() {
    const {AddChatroomModalState, deleteModalState, viewUsersModalState, chatrooms} = useSelector(state => state.admin)
  return (
    <div className="flex justify-center relative">
      {AddChatroomModalState && <AddChatroomModal />}
      {deleteModalState && <Delete />}
      {viewUsersModalState && <Users />}
      <div className="w-full max-w-[1640px]">
        <AdminNavbar />
        <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout