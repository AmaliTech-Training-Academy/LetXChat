import React from 'react'
import UserCard from './UserCard'
import Search from './Search'

function Sidebar() {
  return (
    <div className='h-screen w-[30vw] bg-[#F3F3F3BF]'>
      <UserCard />
      <UserCard settings={true}/>
      <Search />
    </div>
  )
}

export default Sidebar