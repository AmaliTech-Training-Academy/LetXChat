import React, { useEffect, useState } from 'react'
import upload from "../../../assets/upload-image.png"
import close from "../../../assets/close-button.png"
import { useSelector, useDispatch } from 'react-redux'
import {hideAddChatroomModal} from '../../../feature/adminSlice'

function AddChatroomModal() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const dispatch = useDispatch()
    const {AddChatroomModalState} =useSelector(state => state.admin)

    useEffect(() => {
        console.log(AddChatroomModalState);
    }, [AddChatroomModalState])
    useEffect(() => {
        console.log(name);
    }, [name])
    useEffect(() => {
        console.log(description);
    }, [description])

    const handleClick = (e) => {
        e.preventDefault()
        const chatroomObject = new FormData()
        chatroomObject.name = name;
        chatroomObject.description = description
        chatroomObject.image = profileImage
        console.log(chatroomObject)
    }
    
  return (
    <div className='fixed h-screen w-full bg-[#344054b2] backdrop-blur z-10 flex justify-center items-center'>
        <div className=' w-10 h-10 absolute top-16 right-16 bg-white rounded-lg' onClick={() => dispatch(hideAddChatroomModal())}>
            <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
        </div>
        <form className=' w-[600px] bg-slate-100 rounded-lg flex flex-col gap-5 p-10 text-center'>
            <span className=' text-2xl font-semibold'>Add Chatroom</span>
            {/* <label htmlFor="name" className='mb-2'>Name</label> */}
            <input type="text" id='name' placeholder='Enter name' className='p-4 rounded' onChange={(e) => setName(e.target.value)}/>
            {/* <label htmlFor="description" className=' mt-5 mb-2'>Description</label> */}
            <textarea name="description" id="description" placeholder='Enter description' className='p-4 rounded' onChange={(e) => setDescription(e.target.value)}/>
            {/* <label htmlFor="image" className=' mt-5 mb-2'>image</label> */}
            <div className='flex items-center gap-5'>
                <label className=' w-8 h-8' htmlFor="image">
                    <img src={upload} alt="Uplod" className='w-full h-full object-cover cursor-pointer'/>
                </label>
                <span>{profileImage?.name || 'Choose profile picture'}</span>
            </div>
            <input type="file" id='image' hidden onChange={(e) => {
                setProfileImage(e.target.files[0])
            }}/>
            <button className='py-4 bg-blue-300 rounded text-lg font-semibold text-white' onClick={handleClick}>Create Chatroom</button>
        </form>
    </div>
  )
}

export default AddChatroomModal