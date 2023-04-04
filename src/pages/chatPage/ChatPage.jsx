import { Box, styled } from '@mui/material'
import React from 'react'
import ChatHead from '../../components/chatHead/ChatHead'
import ChatMessage from '../../components/chatMessage/ChatMessage'
import Input from '../../components/input/Input'

const Container = styled(Box)({
    width: '50vw',
    height: '100vh',
    marginInline: 'auto',
    background: 'blue',
    display: 'flex',
    flexDirection: 'column'
})

const ChatPage = () => {
  return (
    <Container component='main'>
        <ChatHead />
        <ChatMessage />
        <Input />
    </Container>
  )
}

export default ChatPage