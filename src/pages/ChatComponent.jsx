import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import Chat from './chat/Chat';
import { Outlet } from 'react-router';

const Container = styled(Box)({
    display: 'flex',
    height: '100vh',
    width: '100vw'
})

const ChatComponent = () => {
  return (
    <Container>
      <SidebarLayout />
    <div>

      <Outlet />
    </div>
    </Container>
  );
}

export default ChatComponent;
