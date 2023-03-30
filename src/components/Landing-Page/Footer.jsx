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
    <div className='w-full h-[455px] bg-[#755D57E5] px-24 flex items-center justify-center text-white'>
        <div className='w-full max-w-[1440px] flex justify-between'>
            <div>
                <div className='font-semibold text-5xl mb-2'>Logo</div>
                {/* <div className='font-black text-3xl w-48 h-11'>
                    <img src={logo} alt="LOGO" className='w-full h-full object-cover'/>
                </div> */}
                <span className=' text-xl'>Lorem ipsum dolor sit amet<br/> consectetur adipiscing </span>
                <div className='flex mt-16 gap-8'>
                    {instagram_icon}
                    {facebook_icon}
                    {twitter_icon}
                    {linkedin_icon}
                </div>
            </div>
            <div className='flex gap-32 text-2xl'>
                <div className='flex flex-col gap-5'>
                    <span className='font-semibold'>Contact</span>
                    <span className='opacity-60 hover:underline'>Email us</span>
                    <span className='opacity-60 hover:underline'>Company</span>
                    <span className='opacity-60 hover:underline'>Chat rooms</span>
                    <span className='opacity-60 hover:underline'>How it works</span>
                </div>
                <div className='flex flex-col gap-5'>
                    <span className='font-semibold'>Support</span>
                    <span className='opacity-60 hover:underline'>FAQ’s</span>
                    <span className='opacity-60 hover:underline'>Help center</span>
                    <span className='opacity-60 hover:underline'>Consult</span>
                </div>
                <div className='flex flex-col gap-5'>
                    <span className='font-semibold'>Get in touch</span>
                    <span className='opacity-60 hover:underline'>hello@amalitech.com</span>
                    <span className='opacity-60 hover:underline'>+2334567876</span>
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