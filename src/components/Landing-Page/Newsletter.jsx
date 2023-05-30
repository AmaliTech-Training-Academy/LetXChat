import React from 'react'

function Newsletter() {
  return (
    <div className='w-full h-44 bg-[#D9D9D9] px-24 flex items-center justify-center'>
        <div className='w-full max-w-[1440px] h-16 flex justify-between'>
            <div className='font-semibold flex flex-col'>
                <span className='text-3xl'>Newsletter</span>
                <span className='text-2xl opacity-50'>Join to get free updates everyweek</span>
            </div>
            <div className='w-[622px] h-full text-2xl flex relative rounded-xl bg-white'>
                <input type="text" className='w-[409px] bg-transparent rounded-l-xl h-full px-12'placeholder='Enter email address'/>
                <button className=' w-40 lg:w-[213px] h-full text-white bg-[#755D57E5] hover:bg-[#53352D] rounded-xl absolute right-0'>Join Now</button>
            </div>
        </div>
    </div>
  )
}

export default Newsletter