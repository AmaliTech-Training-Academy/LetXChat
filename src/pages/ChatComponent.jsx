import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import Chat from './chat/Chat';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import NoMessage from '../assets/no-message svg.svg'

const Container = styled(Box)({
    display: 'flex',
    height: '100vh',
    width: '100vw'
})

const NoMessageCont = styled(Box)({
  width: '75vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const ChatComponent = () => {
  const { allChatRooms } = useSelector((state) => state.chatrooms);
  // const Rooms = allChatRooms?.find(
  //   (chatroom) => chatroom?.id === parseInt(id)
  // );

 


  return (
    <Container>
      <SidebarLayout />
    <div>

      <Outlet />
      
      {!allChatRooms && (
        <NoMessageCont>
          <img style={{width: '70%',}} src={NoMessage} alt="no message" />
        </NoMessageCont>
      )}

    </div>
    </Container>
  );
}

export default ChatComponent;
