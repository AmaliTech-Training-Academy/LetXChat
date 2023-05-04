import React, { useEffect } from 'react'
import close from '../../../assets/close-svg.svg'
import no_data from '../../../assets/no-data.svg'
import {hideAllUsersModal} from '../../../feature/adminSlice'
import {useDispatch, useSelector} from 'react-redux'
import UserSearch from '../UserSearch'

function AllUsers() {
    const {allUsers} = useSelector(state => state.admin)
    const dispatch = useDispatch()
  return (
    <div className="fixed h-screen w-full bg-[#344054b2] backdrop-blur z-10 flex justify-center items-center">
        <div className="w-[600px] bg-white rounded-lg p-8 relative">
        <div className=' w-4 h-4 absolute top-6 right-7' onClick={() => dispatch(hideAllUsersModal())}>
            <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
        </div>
        <div className=' w-full text-center'>
            <span className=' font-semibold text-2xl'>All users</span>
        </div>
        <div className=" mt-7 max-h-[600px] overflow-y-scroll">
        {allUsers?.users.length ? allUsers?.users.map(item => {
                return (
                    <UserSearch added={true} page="allUsers" item={item} key={item.id}/>
                )
            }) :
            <div className=" h-80 flex flex-col items-center justify-center">
                <img src={no_data} alt="No data" />
                <span>No users</span>
            </div>
            }
        </div>
        </div>
    </div>
  )
}

export default AllUsers