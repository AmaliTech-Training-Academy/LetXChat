import React from 'react'
import UserCard from './UserCard'
import Search from './Search'
import CreateGroup from './CreateGroup'

function Sidebar() {
  return (
    <div className='h-screen w-[30vw] bg-[#F3F3F3BF] flex flex-col'>
      <UserCard />
      <UserCard settings={true}/>
      <Search />
      <CreateGroup />
      <div>
        
      </div>
    </div>
  )
}

export default Sidebar