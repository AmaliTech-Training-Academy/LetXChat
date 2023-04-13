import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ChatPage from '../chatPage/ChatPage';
import GroupDetails from '../../components/groupDetails/GroupDetails';
import Sidebar from '../../components/sidebar/Sidebar';
import SidebarLayout from '../../components/layouts/SidebarLayout';


const Container = styled(Box)({
    display: 'flex'
})

const Chat = () => {
  return (
    <Container>
      <ChatPage />
      <GroupDetails />
    </Container>
  );
}

export default Chat;
