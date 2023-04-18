import React from 'react'
import logo from '../../assets/logo.png'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  if(location.pathname === '/signup' || location.pathname === '/login') {
    return null
  };

  return (
    <div className='w-full h-20 bg-[#FDF4F4] flex justify-center items-center px-24'>
      <nav className='w-full max-w-[1440px] flex justify-between items-center'>
          <Link to='/' className='font-black text-3xl w-48 h-11'>
            <img src={logo} alt="LOGO" className='w-full h-full object-cover'/>
          </Link>
          <ul className='flex gap-11'>
              <Link to='/' className='text-xl cursor-pointer relative hover:text-[#53352D] after:absolute after:h-[2px] after:w-full after:bottom-0 after:inset-x-0 after:bg-[#53352D] after:scale-x-0 after:content-[""] hover:after:scale-x-100 after:origin-bottom-left after:transition-all'>Home</Link>
              <Link to='/about' className='text-xl cursor-pointer relative hover:text-[#53352D] after:absolute after:h-[2px] after:w-full after:bottom-0 after:inset-x-0 after:bg-[#53352D] after:scale-x-0 after:content-[""] hover:after:scale-x-100 after:origin-bottom-left after:transition-all'>About</Link>
              <Link to='/contact' className='text-xl cursor-pointer relative hover:text-[#53352D] after:absolute after:h-[2px] after:w-full after:bottom-0 after:inset-x-0 after:bg-[#53352D] after:scale-x-0 after:content-[""] hover:after:scale-x-100 after:origin-bottom-left after:transition-all'>Contact</Link>
          </ul>
          <div className='flex gap-5'>
              <Link to='/login' className='border-2 border-[#53352D] py-2 px-4 rounded-lg text-[#53352D] hover:text-white hover:bg-[#53352D]'>Sign in</Link>
              <Link to='/signup' className='py-2 px-4 border-2 border-[#53352D] rounded-lg text-[#53352D] hover:text-white hover:bg-[#53352D]'>Register</Link>
          </div>
      </nav>
    </div>
  )
}

export default Navbar