import { Box, styled } from '@mui/material'
import React from 'react'
import ChatHead from '../../components/chatHead/ChatHead'

const Container = styled(Box)({
    width: '60vw',
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
    </Container>
  )
}

export default ChatPage