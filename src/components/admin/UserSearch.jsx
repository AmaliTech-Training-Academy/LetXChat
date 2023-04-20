import React from 'react'
import trash from "../../assets/trash.svg"
import { toast } from 'react-toastify';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addUserToChatroom, getChatrooms, getAllUsers} from '../../feature/adminSlice'
import axios from 'axios'

function UserSearch({added, item, addedUsers, setAddedUsers, matchedUsers, setMatchedUsers, page}) {
  const {singleChatroom} = useSelector(state => state.admin)
  const dispatch = useDispatch()

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
          const response = await axios.post('https://letxchat.takoraditraining.com/api/v1/request', dataObj)
          if(response.status === 200) {
            updateUsers()
            toast.success("User added successfully")
            dispatch(getChatrooms())
            dispatch(getAllUsers())
          }
        }
      }
      else {
        updateUsers()
      }
    } catch (error) {
      toast.warning("Can't add users right now")
      console.log(error)
    }
    // console.log(newMatchedUsers);
  }

  const handleDelete = async () => {
    if(page !== 'users') {
      // const newAddUsers = addedUsers.filter(ele => ele.id !== item.id)
      console.log(addedUsers);
      // console.log([...matchedUsers, item]);
      // setAddedUsers(newAddUsers)
      // setMatchedUsers([...matchedUsers, item])
    }
    else {
      const response = await axios.delete(`https://letxchat.takoraditraining.com/api/v1/chatroom/${singleChatroom.id}/${item.id}`)
      // console.log(response)
      if(response.status === 200) {
        setAddedUsers(addedUsers.filter(ele => ele.id !== item.id));
        toast.success("User deleted successfully")
        dispatch(getChatrooms())
      }
    }
  }

  // useEffect(() => {
    // console.log(item);
    // console.log(singleChatroom);
  // }, [])
  // useEffect(() => {
  //   console.log(matchedUsers);
  // }, [matchedUsers])
  return (
    <div className={`w-full ${added ? '' : 'border-b'} flex justify-between items-center text-xs mt-2 pb-1`}>
        <div className='flex items-center gap-4'>
            <div className=' w-9 h-9 rounded-full'>
                <img src={item.image} alt="" className='w-full h-full object-cover rounded-full'/>
            </div>
            <div className='flex flex-col'>
            <span>{item.fullname}</span>
            <span className='text-[#667085]'>{item.email}</span>
            </div>
        </div>
        {added && <img src={trash} alt="remove" className=' mr-2' onClick={handleDelete}/>}
        {!added && <button className=' px-2 py-1 bg-blue-600 text-white rounded-md' onClick={handleClick}>Add</button>}
    </div>
  )
}

export default UserSearch