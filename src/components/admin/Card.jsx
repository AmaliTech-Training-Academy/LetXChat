import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {showAllUsersModal} from '../../feature/adminSlice'
import {loader} from '../../svg/Icons'

function Card({title, image, users}) {
  const dispatch = useDispatch()
  const {loadingUsers} = useSelector(state => state.admin)

  const handleClick = () => {
    if(title === 'Total Users') {
      dispatch(showAllUsersModal())
    }
  }
  return (
    <div className='w-full h-28 lg:w-[300px] lg:h-[113px] bg-gradient-to-r from-[#53352DE5] to-[#FDC90F] flex items-end mt-7 lg:mt-14 rounded-md shadow-md cursor-pointer' onClick={handleClick}>
        <div className='w-full h-[98%] bg-white rounded-t rounded-b-md flex gap-3 pl-3 pt-[14px]'>
            <div className={`w-10 h-10 ${title === "ChatRooms" && "bg-blue-100 rounded-full flex items-center justify-center"}`}>
                <img src={image} alt="" className={`${title === "ChatRooms" && ' w-3/5 h-3/5 object-cover'}`}/>
            </div>
            <div className='flex flex-col gap-4'>
                <span className='text-[#101828] font-medium md:text-2xl'>{title}</span>
                {loadingUsers ? loader :
                <span className='text-[#667085] md:text-2xl'>{users}</span>}
            </div>
        </div>
    </div>
  )
}

export default Card