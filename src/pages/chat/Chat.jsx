import { Skeleton, styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ChatPage from '../chatPage/ChatPage';
import GroupDetails from '../../components/groupDetails/GroupDetails';
import { useSelector } from 'react-redux';
import { connectToChatroom } from '../../feature/chatRoomSlice';



const Container = styled(Box)({
    display: 'flex'
})

const Chat = () => {

    const { loading } = useSelector((state) => state.user);

    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            paddingTop: "1rem",
            width: '100vw',
            marginInline: 'auto'
          }}
        >
            <div style={{height: '8vh'}}>

          <Skeleton
            variant="circular"
            width={70}
            height={70}
            sx={{ marginLeft: "2.5rem" }}
            />
            </div>
          <Skeleton
            animation="wave"
            variant="rounded"
            height={"73vh"}
          />
          <Skeleton variant="rectangular" height={"14vh"} />
        </div>
      );
    }

    // Connect to chatroom
    // useEffect(() => {
    //     dispatch(connectToChatroom(chatroomId));
    //   }, [dispatch, chatroomId]);


  return (
    <Container>
      <ChatPage />
      <GroupDetails />
    </Container>
  );
}

export default Chat;
