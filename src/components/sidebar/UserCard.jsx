import React from 'react'
import userProfile from '../../assets/sidebar_user.png'
import gear from '../../assets/Gear.svg'
import upload from '../../assets/Upload.svg'

function UserCard({settings}) {
  return (
    <div className={`${settings ? `bg-[#ffffff] w-[346px] h-[100px] gap-4` : `bg-[#EDEDED] w-[300px] h-[100px] justify-between`} rounded-xl mx-auto flex items-center mt-9`}>
        <div className={`${settings ? `w-[70px] h-[70px] ml-[23px] relative` : `w-[85px] h-[90px] ml-[10px]`} rounded-full`}>
            <img src={userProfile} alt="User Profile" className='w-full h-full object-contain'/>
            {settings && <div className='bg-black absolute rounded bottom-[2px] -right-[1px]'>
                <img src={upload} alt="" className=''/>
            </div>}
        </div>
        <div className='flex flex-col'>
            <span className={`${settings ? 'font-bold' : 'font-medium text-xs'}`}>abc@gmail.com</span>
            {settings && <span className='text-[#878787]'>@username</span>}
        </div>
        {!settings && <img src={gear} alt="User Profile" className='w-[24px] h-[25px] object-contain mr-[10px]'/>}
    </div>
  )
}

export default UserCard