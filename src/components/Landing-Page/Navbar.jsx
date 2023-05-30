import React from 'react'
import logo from '../../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  
  if(location.pathname !== '/' ) {
    return null
  };

  const userToken = Cookies.get("userToken")

  const logout = () => {
    if(!userToken) {
      return
    }
    Cookies.remove("userToken")
    navigate("/")
  }

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
              <Link to={userToken ? '/chat' : '/login'} className='border-2 border-[#53352D] py-2 px-4 rounded-lg text-[#53352D] hover:text-white hover:bg-[#53352D]'>{userToken ? 'Chat' : 'Log in'}</Link>
              <Link to={userToken ? '' : '/signup'} className='py-2 px-4 border-2 border-[#53352D] rounded-lg text-[#53352D] hover:text-white hover:bg-[#53352D]' onClick={logout}>{userToken ? 'Logout' : 'Sign out'}</Link>
          </div>
      </nav>
    </div>
  )
}

export default Navbar