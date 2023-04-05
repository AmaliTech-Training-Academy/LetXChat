import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Cards from '../../components/admin/Cards'

function Admin() {
  return (
    <div className='flex justify-center'>
        <div className='w-full max-w-[1640px]'>
            <AdminNavbar />
            <Cards />
        </div>
    </div>
  )
}

export default Admin