import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

let userDetails = JSON.parse(localStorage.getItem('userDetails')) || "";
const Navbar = () => {
    const { logoutUser } = useContext(AuthContext);
    return (
        <Box display={'flex'} justifyContent={'space-evenly'} mb={['10%', '10%', '5%']}>
            <Link to={'/dashboard'}><Heading color={'green.600'} fontSize={'28px'}>Dashboard</Heading></Link>
            <Text display={['none', 'none', 'block']}>Welcome❤️{userDetails.name}</Text>
            <Button bg='black' color={'red'} onClick={logoutUser}>Logout</Button>
        </Box>
    );
}

export default Navbar;