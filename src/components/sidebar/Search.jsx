import React from 'react'
import search from '../../assets/Search.svg'

function Search() {
  return (
    <div className='w-[295px] h-9 bg-white mt-14 mx-auto flex items-center rounded-xl'>
        <div className='w-[25px] h-[25px] ml-2'>
            <img src={search} alt="" className='w-full h-full object-cover'/>
        </div>
        <input type='text' placeholder='Search...' className='h-full w-full bg-transparent px-3'/>
    </div>
  )
}

export default Search