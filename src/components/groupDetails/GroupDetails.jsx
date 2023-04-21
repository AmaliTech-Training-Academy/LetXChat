import { Box, styled } from '@mui/material';
import React from 'react';
import GroupImage from '../../assets/user-image.png'

const Container = styled(Box)({
    width: '20vw',
    height: '100vh',
    background: 'rgba(243, 243, 243, 0.75)',
    boxShadow: "-3px 0px 2px -1px rgba(0,0,0,0.25)",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '36px',
    gap: '33px'
})

const GroupName = styled('h3')({
    color: '#000000',
    fontSize: '1.1rem',
    fontWeight: 'bold',
})

const Attachments = styled('h4')({
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginTop: '3rem'
})

const AttachmentCollection = styled(Box)({
    display: 'flex',
    gap: '19px'
})

const Attach = styled(Box)({
    background: 'rgba(83, 53, 45, 0.9)',
    color: '#FFFFFF',
    height: '45px',
    width: '45px',
    borderRadius: '50%',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontWeight: 'bold'
})

const GroupDetails = ({chatRoom}) => {

  return (
    <Container component='aside'>
        <img src={chatRoom?.image} alt="Group Image" style={{height: '150px', width: '150px', borderRadius: '50%'}} />
        <GroupName>{chatRoom?.name}</GroupName>
        <Attachments>Attachments</Attachments>
        <AttachmentCollection>
            <Attach>media</Attach>
            <Attach>links</Attach>
            <Attach>docs</Attach>
        </AttachmentCollection>
    </Container>
  );
}

export default GroupDetails;
