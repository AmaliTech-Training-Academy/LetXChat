import React from 'react'

function Newsletter() {
  return (
    <div className='w-full h-44 bg-[#D9D9D9] py-5 px-10 lg:px-24 flex lg:items-center lg:justify-center'>
        <div className='w-full max-w-[1440px] lg:h-16 flex flex-col md:flex-row justify-between'>
            <div className='font-semibold flex flex-col'>
                <span className=' text-lg lg:text-3xl'>Newsletter</span>
                <span className=' text-lg lg:text-2xl opacity-50'>Join to get free updates everyweek</span>
            </div>
            <div className='md:w-[622px] h-12 lg:h-full text-sm lg:text-2xl flex relative rounded-lg bg-white'>
                <input type="text" className='lg:w-[409px] bg-transparent rounded-l-lg h-full px-3 lg:px-12'placeholder='Enter email address'/>
                <button className=' w-28 md:w-40 lg:w-[213px] h-full text-white bg-[#755D57E5] hover:bg-[#53352D] rounded-lg absolute right-0'>Join Now</button>
            </div>
        </div>
    </div>
  )
}

export default Newsletter