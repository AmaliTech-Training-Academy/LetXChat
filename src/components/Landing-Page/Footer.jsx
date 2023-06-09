import React from 'react'
import { 
    instagram_icon, 
    facebook_icon, 
    twitter_icon, 
    linkedin_icon 
} from '../../svg/Icons'
// import logo from '../../assets/logo.png'

function Footer() {
  return (
    <>
    <div className='w-full h-[455px] bg-[#755D57E5] px-10 lg:px-24 flex items-center justify-center text-white'>
        <div className='w-full max-w-[1440px] flex flex-col md:flex-row justify-between'>
            <div>
                <div className='font-semibold text-5xl mb-2'>Logo</div>
                {/* <div className='font-black text-3xl w-48 h-11'>
                    <img src={logo} alt="LOGO" className='w-full h-full object-cover'/>
                </div> */}
                <span className=' text-sm lg:text-xl'>Lorem ipsum dolor sit amet<br/> consectetur adipiscing </span>
                <div className='flex mt-8 lg:mt-16 lg:gap-8 footer-svgs'>
                    {instagram_icon}
                    {facebook_icon}
                    {twitter_icon}
                    {linkedin_icon}
                </div>
            </div>
            <div className='flex gap-5 lg:gap-32'>
                <div className='flex flex-col gap-2 lg:gap-5'>
                    <span className='font-semibold lg:text-2xl'>Contact</span>
                    <span className='opacity-60 hover:underline lg:text-2xl'>Email us</span>
                    <span className='opacity-60 hover:underline lg:text-2xl'>Company</span>
                    <span className='opacity-60 hover:underline lg:text-2xl'>Chat rooms</span>
                    <span className='opacity-60 hover:underline lg:text-2xl'>How it works</span>
                </div>
                <div className='flex flex-col gap-2 lg:gap-5'>
                    <span className='font-semibold lg:text-2xl'>Support</span>
                    <span className='opacity-60 hover:underline lg:text-2xl'>FAQ’s</span>
                    <span className='opacity-60 hover:underline lg:text-2xl'>Help center</span>
                    <span className='opacity-60 hover:underline lg:text-2xl'>Consult</span>
                </div>
                <div className='flex flex-col gap-2 lg:gap-5'>
                    <span className='font-semibold lg:text-2xl'>Get in touch</span>
                    <span className='opacity-60 hover:underline lg:text-2xl'>hello@amalitech.com</span>
                    <span className='opacity-60 hover:underline lg:text-2xl'>+2334567876</span>
                </div>
            </div>
        </div>
    </div>
    <div className='h-20 bg-[#755D57] flex justify-center items-center
     text-white'>
        <span>Copyright &copy; Amalitech 2023.All rights reserved.</span>
    </div>
    </>
  )
}

export default Footer