import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {hideEditChatroomModal, getChatrooms, setRefresh} from '../../../feature/adminSlice'
import axios from 'axios'
import upload from '../../../assets/Upload-Vector.svg'
import close from '../../../assets/close-svg.svg'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

function EditChatroomModal() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [saving, setSaving] = useState(false)
    const dispatch = useDispatch()
    const {singleChatroom} =useSelector(state => state.admin)

    const adminToken = Cookies.get('adminToken')

    const headers = {
        Authorization: `Bearer ${adminToken}`
    }

    useEffect(() => {
        setName(singleChatroom.name)
        setDescription(singleChatroom.description)
    }, [])

    const handleClick = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        name && data.set('name', name)
        description && data.set('description', description)
        profileImage && data.set('image', profileImage)
            try {
                const response = await axios.post(`https://letxchat.takoraditraining.com/api/v1/chatrooms/${singleChatroom.id}`, data, {headers})
                if(response.status === 200) {
                    toast.success("Chatroom edited successfully")
                    dispatch(getChatrooms())
                    dispatch(hideEditChatroomModal())
                    dispatch(setRefresh(true))
                }
                else {
                    toast.warning("Chatroom edit wasn't successfull")
                }
            } catch (error) {
                toast.warning(error)
            }
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
            <input type="text" id='name' name='name' value={name} placeholder='Enter name' className='p-4 rounded-lg border-2 shadow-sm' onChange={(e) => setName(e.target.value)}/>
            {/* <label htmlFor="description" className=' mt-5 mb-2'>Description</label> */}
            <label htmlFor="description">Description</label>
            <input type='text' name="description" id="description" value={description} placeholder='Enter description' className='p-4 rounded-lg border-2 shadow-sm' onChange={(e) => setDescription(e.target.value)}/>
            {/* <label htmlFor="image" className=' mt-5 mb-2'>image</label> */}
            <div className='flex items-center justify-between'>
                <div className='flex gap-5'>
                <label className=' w-8 h-8' htmlFor="image">
                    <img src={upload} alt="Uplod" className='w-full h-full object-contain cursor-pointer'/>
                </label>
                <span className='text-[#1570EFE5]'>{profileImage?.name || 'Upload new profile'}</span>
                </div>
                <div className=' w-16 h-16 rounded-full'>
                    <img src={profileImage ? URL.createObjectURL(profileImage) : singleChatroom.image} alt="" className=' w-full h-full object-cover rounded-full'/>
                </div>
            </div>
            <input type="file" id='image' name='image' hidden onChange={(e) => {
                setProfileImage(e.target.files[0])
            }}/>
            <button className={`py-4 ${saving ? 'bg-[#7ab1ffe5]' : 'bg-[#1570EFE5]'} rounded text-lg font-semibold text-white`} onClick={handleClick}>{saving ? 'Saving...' : 'Save Changes'}</button>
        </form>
    </div>
  )
}

export default EditChatroomModal