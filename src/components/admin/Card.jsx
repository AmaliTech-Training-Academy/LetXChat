import React from 'react'

function Card({title, image, users}) {
  return (
    <div className='w-3/5 h-28 md:w-[300px] md:h-[113px] bg-gradient-to-r from-[#53352DE5] to-[#FDC90F] flex items-end mt-7 md:mt-14 rounded-md shadow-md'>
        <div className='w-full h-[98%] bg-white rounded-t rounded-b-md flex gap-3 pl-3 pt-[14px]'>
            <div>
                <img src={image} alt="" />
            </div>
            <div className='flex flex-col gap-4'>
                <span className='text-[#101828] font-medium md:text-2xl'>{title}</span>
                <span className='text-[#667085] md:text-2xl'>{users}</span>
            </div>
        </div>
    </div>
  )
}

export default Card