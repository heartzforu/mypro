import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'

function Register() {
    
  return (
    <Container>
        <Box>
            <Box className='flex flex-col mt-12 items-center border-2 shadow p-6'>
                <Typography variant='h5'>Register</Typography>
                <TextField type='text' label='Name'/>
                <TextField type='email' label='email'/>
                <TextField type='password' label='Password'/>
                <Button variant='contained'>Register</Button>
            </Box>
        </Box>
    </Container>
  )
}

export default Register
