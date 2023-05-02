import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import search from '../../../assets/admin-search.png'
import close from "../../../assets/close-svg.svg"
import no_data from "../../../assets/no-data.svg"
import {hideViewUsersModal} from "../../../feature/adminSlice"
import { useDispatch, useSelector } from "react-redux";
import UserSearch from "../UserSearch";

function Users() {
    const [searchUsers , setSearchUsers ] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [matchedUsers, setMatchedUsers] = useState([])
    const [addedUsers, setAddedUsers] = useState([])
    const {singleChatroom, allUsers} = useSelector(state => state.admin)
    const dispatch = useDispatch()

    const handleInput = (e) => {
        setSearchInput(e.target.value)
        setMatchedUsers(allUsers.users.filter(ele => ele.fullname.toLowerCase().includes(e.target.value.toLowerCase()) || ele.username.toLowerCase().includes(e.target.value.toLowerCase()) || ele.email.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    useEffect(() => {
        setAddedUsers(allUsers.users.filter(ele => singleChatroom.members.some(ele2 => ele2.name === ele.fullname)))
    }, [])

  return (
    <div className="fixed h-screen w-full bg-[#344054b2] backdrop-blur z-10 flex justify-center items-center">
        {/* <div className=' w-10 h-10 absolute top-16 right-16 bg-white rounded-lg' onClick={() => dispatch(hideViewUsersModal())}>
            <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
        </div> */}
      <div className="w-[600px] bg-white rounded-lg p-8 relative">
        <div className=' w-4 h-4 absolute top-6 right-7' onClick={() => dispatch(hideViewUsersModal())}>
            <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
        </div>
        <div className=" border-b pb-3 mt-8 flex justify-between gap-6 items-center">
            {!searchUsers && <div>
            <span className=" mr-2 text-[#667085] text-sm">Members</span>
            <span className=" px-1 bg-gray-300 rounded-full text-xs text-[#344054]">{addedUsers.length}</span>
            </div>}
            {searchUsers && 
            <div className="w-full flex items-center bg-[#D9D9D982] px-3">
                <div>
                <img src={search} alt="search" className=""/>
                </div>
                <input type="text" className=" w-full p-2 bg-transparent break-words" placeholder="Search Users" onInput={handleInput}/>
            </div>}
            <span className={`font-semibold text-2xl text-[#667085] cursor-pointer ${searchUsers ? 'rotate-45' : ''}`} onClick={() => {
                setSearchUsers(!searchUsers)
                setSearchInput('')
                }}>+</span>
        </div>
        <div className=" mt-7 max-h-96 overflow-y-scroll">
            {matchedUsers.length > 0 && searchInput !== '' && 
            <>
            <div className=" max-h-32 rounded-2xl shadow-md p-4 overflow-y-scroll">
                <span>Search results...</span>
                {matchedUsers.map(item => (
                    <UserSearch addedUsers={addedUsers} setAddedUsers={setAddedUsers} item={item} matchedUsers={matchedUsers} setMatchedUsers={setMatchedUsers} page="users" key={item.id}/>
                ))}
            </div>
            <hr className=" my-5"/>
            </>
            
            }
            {addedUsers?.length ? addedUsers?.map(item => {
                return (
                    <UserSearch added={true} item={item} page='users' key={item.id} addedUsers={addedUsers} setAddedUsers={setAddedUsers}/>
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
  );
}

export default Users;
