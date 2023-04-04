import { Box, styled } from '@mui/material'
import React from 'react'

const Content = styled(Box)({

    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
})


const Messages = () => {
  return (
    <Content>
        <div>Message1</div>
        <div>Message1</div>
        <div>Message1</div>
        <div>Message1</div>
        <div>Message1</div>
        <div>Message1</div>
    </Content>
  )
}

export default Messages