import React, { useEffect, useState } from 'react'
import search from '../../assets/Search.svg'

function Search({settings, setMatchedChatrooms}) {
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    console.log(searchInput);
  }, [searchInput])

  const handleSearch = (e) => {
    setMatchedChatrooms()
  }

  return (
    <div className={`${!settings ? 'mt-14 rounded-xl' : 'mt-0 rounded-lg'} w-[295px] h-9 bg-white mx-auto flex items-center`}>
        {!settings && <div className='w-[25px] h-[25px] ml-2'>
            <img src={search} alt="" className='w-full h-full object-cover'/>
        </div>}
        <input type='text' onInput={handleSearch} placeholder={`${settings ? '@username' : 'Search...'}`} className='h-full w-full bg-transparent px-3'/>
    </div>
  )
}

export default Search