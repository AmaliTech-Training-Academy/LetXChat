import React from 'react'
import AdminNavbar from '../components/admin/AdminNavbar'
import EditChatroomModal from '../components/admin/modals/EditChatroomModal'
import Delete from '../components/admin/modals/Delete'
import Users from '../components/admin/modals/Users'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'

function AdminLayout() {
    const {AddChatroomModalState, deleteModalState, viewUsersModalState, chatrooms} = useSelector(state => state.admin)
  return (
    <div className="flex justify-center relative">
      {AddChatroomModalState && <EditChatroomModal />}
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