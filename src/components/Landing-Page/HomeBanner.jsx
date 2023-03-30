import React from 'react'
import playBtn from '../../assets/playBtn.svg'
import hero1 from '../../assets/hero_1.png'
import hero2 from '../../assets/hero_2.png'

function HomeBanner() {
  return (
    <div className='w-full h-[746px] bg-gradient-to-b from-[#BAAEAB] to-[#F8F7F7]'>
        <div className='w-full px-24 flex flex-col text-center'>
            <h1 className='w-full font-semibold text-7xl mt-32'>Connect, <span className='text-white'>Grow</span> and Inspire.</h1>
            <span className='w-[969px] font-semibold text-3xl mt-5 mx-auto text-[#0000007f]'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</span>
            <button className='border border-[#53352D] hover:bg-[#53352D] hover:text-white rounded-lg flex items-center justify-between p-3 font-semibold text-[#53352D] text-xl w-48 mx-auto mt-5'>
              watch video 
              <div className='text-bold w-6 h-6 bg-white flex items-center justify-center rounded-full'>
                <img src={playBtn} alt="" />
              </div> 
            </button>
        </div>
        <div className='w-7/12 max-w-[748px] w- h-80 mx-auto mt-5 flex justify-between'>
            <div className='w-[48%] h-60 relative'>
              <div className='h-full w-44'>
                <img className='w-full h-full object-contain' src={hero1} alt="" />
              </div>
              <div className='text-white w-48 h-7 flex justify-between absolute right-0 top-16'>
                <div className='w-7 h-7 bg-[#F1BF0CE5] rounded-full flex items-center justify-center relative text-xs'>
                  <span>GE</span>
                  <div className='w-1 h-1 bg-[#42F053] rounded-full absolute right-0 bottom-1.5'></div>
                </div>
                <div className='text-white w-36 bg-[#BAAEAB] text-[7.8px] flex items-center justify-center rounded-xl'>
                  <span>How  do you add the components</span>
                </div>
              </div>
            </div>
            <div className='w-[48%] h-60 relative flex flex-row-reverse mt-auto'>
              <div className='h-full w-44'>
                <img className='w-full h-full object-contain' src={hero2} alt="" />
              </div>
              <div className='text-white w-48 h-7 absolute left-0 top-14 flex flex-row-reverse justify-between'>
                <div className='w-7 h-7 bg-[#755D57E5] rounded-full flex items-center justify-center relative text-xs'>
                  <span>TA</span>
                  <div className='w-1 h-1 bg-[#42F053] rounded-full absolute right-0 bottom-1.5'></div>
                </div>
                <div className='text-white w-36 bg-[#5C98F1] text-[7.8px] flex items-center justify-center rounded-xl'>
                  <span>Which frontend stack do you use</span>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default HomeBanner