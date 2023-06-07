import React from 'react'
import collaboration from '../../assets/collaboration-section.png'

function BodyContent() {
  return (
    <div className='w-full lg:max-h-[1055px] px-8 lg:px-20 py-10 flex items-center justify-center'>
        <div className='w-full max-w-[1440px] h-full flex flex-col items-center gap-6'>
            <h1 className='font-semibold text-3xl lg:text-5xl'>Collaborative Teams</h1>
            <span className='max-w-[1269px] text-center font-semibold lg:text-[27px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
            <div className='w-full lg:h-[540px] flex flex-col lg:flex-row gap-10 lg:justify-between items-center mt-7'>
                <div className='lg:w-[892px]'>
                    <img className='w-full h-full object-cover' src={collaboration} alt="" />
                </div>
                <div className='flex flex-col gap-5 lg:gap-10 w-[377px]'>
                    <span className='w-[143px] text-center font-semibold text-[27px] border-b pb-3 border-black mx-auto'>Features</span>
                    <div className='flex gap-11'>
                        <div className='w-8 h-8 bg-[#755d57e5] text-white rounded-full flex items-center justify-center'>1</div>
                        <span className='text-xl'>Join project-based chatrooms</span>
                    </div>
                    <div className='flex gap-11 mt-10 '>
                        <div className='w-8 h-8 bg-[#755d57e5] text-white rounded-full flex items-center justify-center'>2</div>
                        <span className='text-xl w-[302px]'>Share text, images, voice notes and videos</span>
                    </div>
                    <div className='flex gap-11 mt-10'>
                        <div className='w-8 h-8 bg-[#755d57e5] text-white rounded-full flex items-center justify-center'>3</div>
                        <span className='text-xl'>View and edit profile</span>
                    </div>
                </div>
            </div>
            <span className='font-normal lg:text-2xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        </div>
    </div>
  )
}

export default BodyContent