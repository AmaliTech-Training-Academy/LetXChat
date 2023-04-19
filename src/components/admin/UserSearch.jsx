import React from 'react'
import trash from "../../assets/trash.svg"
import rose from '../../assets/rose.png'

function UserSearch({added, item}) {
  return (
    <div className={`w-full ${added ? '' : 'border-b'} flex justify-between items-center text-xs mt-2 pb-1`}>
        <div className='flex items-center gap-4'>
            <div className=' w-9 h-9 rounded-full'>
                <img src={item.image} alt="" className='w-full h-full object-cover rounded-full'/>
            </div>
            <div className='flex flex-col'>
            <span>{item.name}</span>
            <span className='text-[#667085]'>{item.email}</span>
            </div>
        </div>
        {added && <img src={trash} alt="remove" className=' mr-2'/>}
        {!added && <button className=' px-2 py-1 bg-blue-600 text-white rounded-md'>Add</button>}
    </div>
  )
}

export default UserSearch