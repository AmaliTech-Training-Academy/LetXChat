import React, { useEffect, useState } from "react";
import close from "../../../assets/close-svg.svg"
import no_data from "../../../assets/no-data.svg"
import {hideViewUsersModal} from "../../../feature/adminSlice"
import { useDispatch, useSelector } from "react-redux";
import UserSearch from "../UserSearch";

function Users() {
    // const [addMember, setAddMember] = useState(false)
    // const [members, setMembers] = useState([])
    const {chatroomMembers, singleChatroom} = useSelector(state => state.admin)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     setMembers(singleChatroom.members)
    //     console.log(singleChatroom);
    // }, [])

  return (
    <div className="fixed h-screen w-full bg-[#344054b2] backdrop-blur z-10 flex justify-center items-center">
        {/* <div className=' w-10 h-10 absolute top-16 right-16 bg-white rounded-lg' onClick={() => dispatch(hideViewUsersModal())}>
            <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
        </div> */}
      <div className="w-[600px] bg-slate-100 rounded-lg p-8 relative">
        <div className=' w-4 h-4 absolute top-6 right-7' onClick={() => dispatch(hideViewUsersModal())}>
            <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
        </div>
        <div className=" border-b pb-3 mt-8">
            <span className=" mr-2 text-[#667085] text-sm">Members</span>
            <span className=" px-1 bg-gray-300 rounded-full text-xs text-[#344054]">{chatroomMembers.length}</span>
        </div>
        <div className=" mt-7 max-h-96 overflow-y-scroll">
            {chatroomMembers.length ? chatroomMembers.map(item => {
                return (
                    <UserSearch added={true} item={item}/>
                )
            }) :
            <div className=" h-80 flex flex-col items-center justify-center">
                <img src={no_data} alt="No data" />
                <span>No users</span>
            </div>}
        </div>
        {/* <header className="flex mb-5 font-semibold text-xl">
            <span className="flex-1 text-center">Name</span>
            <span className="flex-1 text-center">Email</span>
        </header>
        <div className=" max-h-[300px] overflow-y-scroll">
            <div className="flex border-b-2 py-5">
                <span className="flex-1 text-center">Mikael Depay</span>
                <span className="flex-1 text-center w-[100px] break-words">mikaeldepay@gmail.commikaeldepay@gmail.com</span>
            </div>
            <div className="flex border-b-2 py-5">
                <span className="flex-1 text-center">Mikael Depay</span>
                <span className="flex-1 text-center w-[100px] break-words">mikaeldepay@gmail.com</span>
            </div>
            <div className="flex border-b-2 py-5">
                <span className="flex-1 text-center">Mikael Depay</span>
                <span className="flex-1 text-center w-[100px] break-words">mikaeldepay@gmail.commikaeldepay@gmail.com</span>
            </div>
            <div className="flex border-b-2 py-5">
                <span className="flex-1 text-center">Mikael Depay</span>
                <span className="flex-1 text-center w-[100px] break-words">mikaeldepay@gmail.com</span>
            </div>
            <div className="flex border-b-2 py-5">
                <span className="flex-1 text-center">Mikael Depay</span>
                <span className="flex-1 text-center w-[100px] break-words">mikaeldepay@gmail.commikaeldepay@gmail.com</span>
            </div>
        </div>
        <button className="px-8 py-3 bg-blue-400 rounded-lg mt-8 text-white text-lg" onClick={() => {setAddMember(!addMember)}}>Add new member</button><br />
        {addMember && <>
            <input type="text" className="mt-5 w-full p-3 rounded" placeholder="search user"/>
            {members.length !== 0 && <div className="flex flex-col gap-2 w-full h-36 overflow-y-scroll mt-5">
                <span className="cursor-pointer">Emma</span>
                <span className="cursor-pointer">Michael</span>
                <span className="cursor-pointer">Emma</span>
            </div>}
        </>} */}
      </div>
    </div>
  );
}

export default Users;
