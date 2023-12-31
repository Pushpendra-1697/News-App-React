import { Box, Button, Heading, Img, Text } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';

let userDetails = JSON.parse(localStorage.getItem('userDetails')) || "";
const Navbar = () => {
    const { logoutUser } = useContext(AuthContext);
    return (
        <Box display={'flex'} justifyContent={'space-evenly'} mb={['10%', '10%', '5%']}>
            <Link to={'/dashboard'}><Heading color={'green.600'} fontSize={'28px'}><Img w='30px' src={'./logo.jpg'} alt='Dashboard Logo' /></Heading></Link>
            <Text display={['none', 'none', 'block']}>Welcome❤️{userDetails.name}</Text>
            <Button bg='black' color={'red'} onClick={logoutUser}>Logout</Button>
            <Link to='/favorites'><AiOutlineHeart fontSize={'30px'} /></Link>
        </Box>
    );
}

export default Navbar;