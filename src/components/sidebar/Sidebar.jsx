import React from 'react'
import UserCard from './UserCard'
import Search from './Search'
import CreateGroup from './CreateGroup'
import ChatCard from './ChatCard'
import mno from '../../assets/mno.png'
import kofi from '../../assets/kofi.png'
import ama from '../../assets/ama.png'
import king from '../../assets/king.png'
import mum from '../../assets/mum.png'
import chef from '../../assets/chef.png'

const msgArr = [
  {
    image: mno,
    mail: 'mno@yahoo.com',
    message: 'Hello abc!, how are you? I hope everything is good?',
    tim: '06:23',
    no: '1'
  },
  {
    image: kofi,
    mail: 'kofi@gmail.com',
    message: 'Chale! wahala dey oo',
    tim: '07:04',
    no: '1'
  },
  {
    image: ama,
    mail: 'ama@yahoo.com',
    message: 'Hey you, we have a class at 1pm. Don’t forget',
    tim: '09:17',
    no: '2'
  },
  {
    image: king,
    mail: 'king@gmail.com',
    message: 'I done with the design of the house.',
    tim: '11:00',
    no: '2'
  },
  {
    image: mum,
    mail: 'mum@yahoo.com',
    message: 'Hello son, get me some drugs on your way home',
    tim: '13:39',
    no: '1'
  },
  {
    image: chef,
    mail: 'chef@gmail.com',
    message: 'Buddy, your order is ready for pickup at our office',
    tim: '16:51',
    no: '4'
  },
  {
    image: mno,
    mail: 'mno@yahoo.com',
    message: 'Hello abc!, how are you? I hope everything is good?',
    tim: '06:23',
    no: '1'
  },
  {
    image: kofi,
    mail: 'kofi@gmail.com',
    message: 'Chale! wahala dey oo',
    tim: '07:04',
    no: '1'
  },
  {
    image: ama,
    mail: 'ama@yahoo.com',
    message: 'Hey you, we have a class at 1pm. Don’t forget',
    tim: '09:17',
    no: '2'
  },
  {
    image: king,
    mail: 'king@gmail.com',
    message: 'I done with the design of the house.',
    tim: '11:00',
    no: '2'
  },
  {
    image: mum,
    mail: 'mum@yahoo.com',
    message: 'Hello son, get me some drugs on your way home',
    tim: '13:39',
    no: '1'
  },
  {
    image: king,
    mail: 'king@gmail.com',
    message: 'I done with the design of the house.',
    tim: '11:00',
    no: '2'
  },
  {
    image: mum,
    mail: 'mum@yahoo.com',
    message: 'Hello son, get me some drugs on your way home',
    tim: '13:39',
    no: '1'
  },
  {
    image: king,
    mail: 'king@gmail.com',
    message: 'I done with the design of the house.',
    tim: '11:00',
    no: '2'
  },
  {
    image: mum,
    mail: 'mum@yahoo.com',
    message: 'Hello son, get me some drugs on your way home',
    tim: '13:39',
    no: '1'
  },
  {
    image: chef,
    mail: 'chef@gmail.com',
    message: 'Buddy, your order is ready for pickup at our office',
    tim: '16:51',
    no: '4'
  }
]

function Sidebar() {
  return (
    <div className='h-screen w-[25vw] bg-[#F3F3F3BF] flex flex-col'>
      <UserCard/>
      <Search />
      <CreateGroup />
      <div className='w-full h-full mt-8 overflow-y-scroll bg-transparent my-auto flex flex-col gap-4 items-center'>
        {msgArr.map(ele => {
          return (
            <ChatCard item={ele}/>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar