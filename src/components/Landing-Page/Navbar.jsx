import React from 'react'

function Navbar() {
  return (
    <nav className='w-full h-20 bg-[#FDF4F4] flex justify-between items-center px-24'>
        <span className='font-black text-3xl'>LOGO</span>
        <ul className='flex gap-11'>
            <li className='text-xl cursor-pointer'>Home</li>
            <li className='text-xl cursor-pointer'>About</li>
            <li className='text-xl cursor-pointer'>Contact</li>
        </ul>
        <div className='flex gap-5'>
            <button className='border-2 border-[#53352D] py-2 px-4 rounded-lg text-[#53352D]'>Sign in</button>
            <button className='py-2 px-4 rounded-lg bg-[#53352D] text-white'>Register</button>
        </div>
    </nav>
  )
}

export default Navbar