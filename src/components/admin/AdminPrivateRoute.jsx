import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router'

function AdminPrivateRoute({children}) {
    const adminToken = Cookies.get("adminToken")
    if(!adminToken) {
        return <Navigate to='/admin-login' />
    }
  return children
}

export default AdminPrivateRoute