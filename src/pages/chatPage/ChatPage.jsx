import { Box, styled } from '@mui/material'
import React, { useState } from 'react'
import ChatHead from '../../components/chatHead/ChatHead'
import ChatMessage from '../../components/chatMessage/ChatMessage'
import Input from '../../components/input/Input'
import { io } from 'socket.io-client'

const Container = styled(Box)({
    // width: '50vw',
    height: '100vh',
    marginInline: 'auto',
    background: 'blue',
    display: 'flex',
    flexDirection: 'column'
})




const ChatPage = () => {

  const [username, setUsername] = useState('')


  const CUSTOM_URL = 'http://localhost:4000'
  const socket = io.connect(`${CUSTOM_URL}`)

  const sendMessage = (text, setText) => { 

    const messageObj = {
      message: text,
      author: username,
      date: new Date()
    }
    socket.emit("send_message", {...messageObj}) 
    setText("")
  } 


  return (
    <Container component='main'>
        <ChatHead />
        <ChatMessage username={username} />
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <Input sendMessage={sendMessage}/>
    </Container>
  )
}

export default ChatPage