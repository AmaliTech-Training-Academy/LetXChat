import { Box } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import ConfirmImg from '../../assets/confirmation alert.svg'

const Container = styled(Box)({
    width: '100vw',
    height: '100vh',
    background: 'rgba(52, 64, 84, 0.7)',
    position: 'absolute',
    left: '0',
    top: '0',
    zIndex: '20',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const Modal = styled(Box)({
    height: '150px',
    width: 'min(471px, 90vw)',
    background: '#FFFFFF',
    borderRadius: '12px',
   
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
})



const RegModal = () => {
  return (
    <Container component='section'>
        <Modal component='section'>
            <Box sx={{marginTop: '30px'}}>
                <img src={ConfirmImg} alt="confirm icon" />
            </Box>
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px'}}>
            <Box component='p' sx={{width: 'max-content'}}>
            Account created
            </Box>
            <Box component='p' sx={{width: 'max-content'}}>
            Successfully
            </Box>
            </Box>
        </Modal>
    </Container>
  )
}

export default RegModal