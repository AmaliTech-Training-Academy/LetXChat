import { Box, styled } from '@mui/material'
import React from 'react'
import Message from '../message/Message'

const Content = styled(Box)({

    display: 'flex',
    flexDirection: 'column',
    paddingBlock: '0.5rem'
})


const Messages = ({username}) => {
  
  return (
    <Content>
        <Message username={username} />

    </Content>
  )
}

export default Messages