import React from 'react'
import playBtn from '../../assets/playBtn.svg'

function HomeBanner() {
  return (
    <div className='w-full h-[746px] bg-gradient-to-b from-[#BAAEAB] to-[#F8F7F7]'>
        <div className='w-full px-24 flex flex-col text-center'>
            <h1 className='w-full font-semibold text-7xl mt-32'>Connect, <span className='text-white'>Grow</span> and Inspire.</h1>
            <span className='w-[969px] font-semibold text-3xl mt-5 mx-auto text-[#0000007f]'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</span>
            <button className='border border-[#53352D] rounded-lg flex items-center justify-between p-3 font-semibold text-[#53352D] text-xl w-48 mx-auto mt-5'>watch video <div className='text-bold w-6 h-6 bg-white flex items-center justify-center rounded-full'><img src={playBtn} alt="" /></div> </button>
        </div>
        <div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default HomeBanner