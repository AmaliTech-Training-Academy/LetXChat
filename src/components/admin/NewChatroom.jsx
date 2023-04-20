import React, { useEffect, useState } from "react";
import upload from "../../assets/upload-vector.svg"
import UserSearch from "./UserSearch";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NewChatroom() {
    const [name, setName] = useState('')
    const [creating, setCreating] = useState(false)
    const [description, setDescription] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [matchedUsers, setMatchedUsers] = useState([])
    const [addedUsers, setAddedUsers] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const {allUsers} = useSelector(state => state.admin)

    const navigate = useNavigate()

    const addUsers = async () => {
        let usernames = []
            addedUsers.forEach(ele => usernames.push(ele.fullname))
            const dataObj = {}
            dataObj.user_names = usernames
            dataObj.chat_room = name
        try {
            const response = await axios.post('https://letxchat.takoraditraining.com/api/v1/request', dataObj)
             if(response.status === 200) {
                 setName('')
                 setDescription('')
                 setProfileImage('')
                 navigate('/admin')
             }
        } catch (error) {
           console.log(error) 
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        setCreating(true)
        const data = new FormData()
        data.set('name', name)
        data.set('description', description)
        data.set('image', profileImage)

        
        if (name && description && profileImage) {
            try {
               const response = await axios.post('https://letxchat.takoraditraining.com/api/v1/chatrooms', data)
                    if(response.status === 201) {
                        if(addedUsers.length > 0) {
                            addUsers()
                        }
                    }
            } catch (error) {
                throw new Error(error)
            }
        }
        else {
            console.log("some fields are empty")
        }
    }

    const handleInput = (e) => {
        setSearchInput(e.target.value)
        setMatchedUsers(allUsers.users.filter(ele => ele.fullname.toLowerCase().includes(e.target.value.toLowerCase()) || ele.username.toLowerCase().includes(e.target.value.toLowerCase()) || ele.email.toLowerCase().includes(e.target.value.toLowerCase())));
    }
    // useEffect(() => {
    //     console.log(addedUsers);
    // }, [addedUsers])

  return (
    <div className="w-full h-full px-12 pt-9">
        <span className=" font-bold">Create Chatroom</span>
        <div className="flex border-2 shadow-sm rounded-lg mt-7">
            <aside className="flex-[0.6] border-r px-8 pt-6">
                <span>Chatroom Profile</span>
                <div className="w-full h-60 bg-[#D9D9D966] rounded-lg flex items-center justify-center mt-7">
                    {!profileImage && <label htmlFor="profile">
                        <img src={upload} alt="" className="cursor-pointer"/>
                    </label>}
                    {profileImage && <img src={URL.createObjectURL(profileImage)} alt="Selected profile preview" className="w-full h-full object-cover"/>}
                </div>
                <div className="text-center mt-7">
                    <label htmlFor="profile" className="text-[#1570EFE5] cursor-pointer">Upload Profile</label>
                    <input type="file" id="profile" hidden onChange={(e) => setProfileImage(e.target.files[0])}/>
                </div>
                {addedUsers.length > 0 && <>
                <div className=" border-b pb-2">
                    <span className=" mr-2 text-[#667085] text-sm">Members</span>
                    <span className=" px-1 bg-gray-100 rounded-full text-xs">{addedUsers.length}</span>
                </div>
                    <div className="h-64 overflow-y-scroll">
                        {addedUsers.map(item => (
                            <UserSearch added={true} item={item} key={item.id}/>
                        ))}
                        {/* <UserSearch added={true}/>
                        <UserSearch added={true}/>
                        <UserSearch added={true}/>
                        <UserSearch added={true}/> */}
                    </div>
                </>}
            </aside>
            <form className="flex-[1.4] px-10 pt-8 pb-5">
                <label htmlFor="" className=" font-semibold">Chatroom Name<span className=" opacity-40">(Required)</span></label>
                <input type="text" className="w-full border shadow-sm rounded-md py-3 px-4 mt-4 mb-6" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="" className=" font-semibold">Description<span className=" opacity-40">(Required)</span></label>
                <input type="text" className="w-full border shadow-sm rounded-md py-3 px-4 mt-4 mb-6" placeholder="Enter a description" onChange={(e) => setDescription(e.target.value)}/>
                <label htmlFor="" className=" font-semibold">Add Member<span className=" opacity-40">(Optional)</span></label>
                <input type="text" className="w-full border shadow-sm rounded-md py-3 px-4 mt-4 mb-6" placeholder="search for user" onInput={handleInput}/>
                {matchedUsers.length > 0 && searchInput !== '' && <div className="w-full h-64 border rounded-md px-8 overflow-y-scroll pt-2">
                    <span className=" font-semibold border-b pb-1">Search Result...</span>
                    {matchedUsers.map(item => (
                        <UserSearch addedUsers={addedUsers} setAddedUsers={setAddedUsers} matchedUsers={matchedUsers} setMatchedUsers={setMatchedUsers} item={item} key={item.id}/>
                    ))}
                    {/* <UserSearch />
                    <UserSearch />
                    <UserSearch /> */}
                </div>}
                <div className=" mt-8 w-full flex justify-end gap-4">
                    <Link to='/admin' className=" py-3 px-8 border rounded-lg hover:bg-gray-100">Cancel</Link>
                    <button className={`py-3 px-8 ${creating ? 'bg-[#5292ebe5]' : 'bg-[#1570EFE5]'} hover:bg-[#5292ebe5] rounded-lg text-white`} onClick={handleClick}>{creating ? 'Creating...' : 'Create'}</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default NewChatroom;
