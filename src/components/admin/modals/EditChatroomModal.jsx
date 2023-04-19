import React, { useEffect, useState } from 'react'
// import upload from "../../../assets/upload-image.png"
// import close from "../../../assets/close-button.png"
import { useSelector, useDispatch } from 'react-redux'
import {hideEditChatroomModal} from '../../../feature/adminSlice'
import axios from 'axios'
import upload from '../../../assets/Upload-Vector.svg'
import close from '../../../assets/close-svg.svg'

function EditChatroomModal() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const dispatch = useDispatch()
    const {singleChatroom} =useSelector(state => state.admin)

    useEffect(() => {
        setName(singleChatroom.name)
        setDescription(singleChatroom.description)
        // console.log(singleChatroom);
    }, [])
    // useEffect(() => {
    //     console.log(name);
    // }, [name])
    // useEffect(() => {
    //     console.log(description);
    // }, [description])

    const handleClick = async (e) => {
        e.preventDefault()
        // const data = new FormData()
        // data.set('name', name)
        // data.set('description', description)
        // data.set('image', profileImage)
        // if (name && description && profileImage) {
        //     try {
        //         const response = await axios.post('https://letxchat.takoraditraining.com/api/v1/chatrooms', data)
        //         console.log(response)
        //     } catch (error) {
        //         throw new Error(error)
        //     }
        // }
        // else {
        //     console.log("some fields are empty")
        // }
        // console.log(name, description, profileImage)
    }
    
  return (
    <div className='fixed h-screen w-full bg-[#344054b2] backdrop-blur z-10 flex justify-center items-center'>
        <form className=' w-[600px] bg-white rounded-lg flex flex-col gap-5 p-10'>
            <div className=' flex justify-between items-center'>
                <span className=' text-lg font-semibold'>Edit Chatroom</span>
                <div className=' w-4 h-4' onClick={() => dispatch(hideEditChatroomModal())}>
                    <img src={close} alt="close" className='w-full h-full object-cover cursor-pointer' />
                </div>
            </div>
            {/* <label htmlFor="name" className='mb-2'>Name</label> */}
            <label htmlFor="name" className=''>Chatroom Name</label>
            <input type="text" id='name' value={name} placeholder='Enter name' className='p-4 rounded-lg border-2 shadow-sm' onChange={(e) => setName(e.target.value)}/>
            {/* <label htmlFor="description" className=' mt-5 mb-2'>Description</label> */}
            <label htmlFor="description">Description</label>
            <input type='text' name="description" id="description" value={description} placeholder='Enter description' className='p-4 rounded-lg border-2 shadow-sm' onChange={(e) => setDescription(e.target.value)}/>
            {/* <label htmlFor="image" className=' mt-5 mb-2'>image</label> */}
            <div className='flex items-center gap-5'>
                <label className=' w-8 h-8' htmlFor="image">
                    <img src={upload} alt="Uplod" className='w-full h-full object-contain cursor-pointer'/>
                </label>
                <span className='text-[#1570EFE5]'>{profileImage?.name || 'Upload new profile'}</span>
            </div>
            <input type="file" id='image' hidden onChange={(e) => {
                setProfileImage(e.target.files[0])
            }}/>
            <button className='py-4 bg-[#1570EFE5] rounded text-lg font-semibold text-white' onClick={handleClick}>Save Changes</button>
        </form>
    </div>
  )
}

export default EditChatroomModal