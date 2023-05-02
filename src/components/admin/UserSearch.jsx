import React, { useEffect } from 'react'
import trash from "../../assets/trash.svg"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import {addUserToChatroom, getChatrooms, getAllUsers, setRefresh} from '../../feature/adminSlice'
import axios from 'axios'
import Cookies from 'js-cookie';

function UserSearch({added, item, addedUsers, setAddedUsers, matchedUsers, setMatchedUsers, page}) {
  const {singleChatroom} = useSelector(state => state.admin)
  const dispatch = useDispatch()

  const adminToken = Cookies.get('adminToken')

  const headers = {
    Authorization: `Bearer ${adminToken}`
  }

  useEffect(() => {
    console.log(addedUsers);
  }, [addedUsers])

  const updateUsers = () => {
    dispatch(addUserToChatroom(item.id))
    const newMatchedUsers = matchedUsers.filter(ele => ele.id !== item.id)
    setAddedUsers([...addedUsers, item])
    setMatchedUsers(newMatchedUsers)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      if(page === 'users') {
        let username = []
        username.push(item.fullname)
        const dataObj = {}
        dataObj.user_names = username
        dataObj.chat_room = singleChatroom.name
        const alreadyadded = addedUsers.some(ele => (
          ele.id === item.id
        ))
        if(alreadyadded) {
          toast.warning("User already added")
        }
        else {
          const response = await axios.post('https://letxchat.takoraditraining.com/api/v1/request', dataObj, {headers})
          if(response.status === 200) {
            updateUsers()
            toast.success("User added successfully")
            dispatch(getChatrooms())
            dispatch(getAllUsers())
            dispatch(setRefresh(true))
          }
        }
      }
      else {
        updateUsers()
      }
    } catch (error) {
      toast.warning("Can't add users right now")
    }
  }

  const handleDelete = async () => {
    if(page === 'users') {
      const response = await axios.delete(`https://letxchat.takoraditraining.com/api/v1/chatroom/${singleChatroom.id}/${item.id}`, {headers})
      if(response.status === 200) {
        setAddedUsers(addedUsers.filter(ele => ele.id !== item.id));
        toast.success("User deleted successfully")
        dispatch(getChatrooms())
        dispatch(setRefresh(true))
      }
    }
  }
  return (
    <div className={`w-full ${added ? '' : 'border-b'} flex justify-between items-center text-xs mt-2 pb-1`}>
        <div className='flex items-center gap-4'>
            <div className=' w-9 h-9 rounded-full'>
                <img src={item.image} alt="" className='w-full h-full object-cover rounded-full'/>
            </div>
            <div className='flex flex-col'>
            <span>{item.fullname}</span>
            <span className='text-[#667085]'>{added && item.email.length >= 20 ? item.email.slice(0, 18) + '...' : item.email}</span>
            </div>
        </div>
        {added && <img src={trash} alt="remove" className=' mr-2' onClick={handleDelete}/>}
        {!added && <button className=' px-2 py-1 bg-blue-600 text-white rounded-md' onClick={handleClick}>Add</button>}
    </div>
  )
}

export default UserSearch