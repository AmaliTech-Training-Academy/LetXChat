import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  
  if(location.pathname !== '/' ) {
    return null
  };

  const userToken = Cookies.get("userToken")

  const handleClick = (page) => {
    setIsOpen(!isOpen)
    navigate(`/${page}`)
  }

  const logout = () => {
    if(!userToken) {
      return
    }
    Cookies.remove("userToken")
    navigate("/")
  }

  return (
    <div className='relative w-full h-20 bg-[#FDF4F4] flex justify-center items-center px-5 lg:px-24'>
      <nav className='w-full max-w-[1440px] flex justify-between items-center'>
          <Link to='/' className='font-black text-3xl w-32 lg:w-48 lg:h-11'>
            <img src={logo} alt="LOGO" className='w-full h-full object-cover'/>
          </Link>
          <ul className='md:flex gap-11 hidden'>
              <Link to='/' className='text-xl cursor-pointer relative hover:text-[#53352D] after:absolute after:h-[2px] after:w-full after:bottom-0 after:inset-x-0 after:bg-[#53352D] after:scale-x-0 after:content-[""] hover:after:scale-x-100 after:origin-bottom-left after:transition-all'>Home</Link>
              <Link to='/about' className='text-xl cursor-pointer relative hover:text-[#53352D] after:absolute after:h-[2px] after:w-full after:bottom-0 after:inset-x-0 after:bg-[#53352D] after:scale-x-0 after:content-[""] hover:after:scale-x-100 after:origin-bottom-left after:transition-all'>About</Link>
              <Link to='/contact' className='text-xl cursor-pointer relative hover:text-[#53352D] after:absolute after:h-[2px] after:w-full after:bottom-0 after:inset-x-0 after:bg-[#53352D] after:scale-x-0 after:content-[""] hover:after:scale-x-100 after:origin-bottom-left after:transition-all'>Contact</Link>
          </ul>
          <div className='md:flex gap-5 hidden'>
              <Link to={userToken ? '/chat' : '/login'} className='border-2 border-[#53352D] py-1 px-2 lg:py-2 lg:px-4 rounded-lg text-[#53352D] hover:text-white hover:bg-[#53352D]'>{userToken ? 'Chat' : 'Log in'}</Link>
              <Link to={userToken ? '' : '/signup'} className='py-1 px-2 lg:py-2 lg:px-4 border-2 border-[#53352D] rounded-lg text-[#53352D] hover:text-white hover:bg-[#53352D]' onClick={logout}>{userToken ? 'Logout' : 'Sign up'}</Link>
          </div>
          <GiHamburgerMenu className=' w-7 h-7 text-gray-600 block md:hidden' onClick={() => setIsOpen(!isOpen)}/>
          {isOpen && <div className='flex flex-col absolute right-6 top-14 bg-white px-4 rounded-md shadow-md'>
              <span onClick={() => handleClick('')} className='border-b'>Home</span>
              <span onClick={() => handleClick('about')} className='border-b'>About</span>
              <span onClick={() => handleClick('contact')} className='border-b'>Contact</span>
              <Link to={userToken ? '/chat' : '/login'} className=' py-1 px-2 lg:py-2 lg:px-4 rounded-lg text-[#53352D] hover:text-white hover:bg-[#53352D]'>{userToken ? 'Chat' : 'Log in'}</Link>
              <Link to={userToken ? '' : '/signup'} className='py-1 px-2 lg:py-2 lg:px-4 rounded-lg text-[#53352D] hover:text-white hover:bg-[#53352D]' onClick={logout}>{userToken ? 'Logout' : 'Sign up'}</Link>
          </div>}
      </nav>
    </div>
  )
}

export default Navbar