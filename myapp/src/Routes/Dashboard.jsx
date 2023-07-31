import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";






let userDetails = JSON.parse(localStorage.getItem('userDetails')) || "";
function Dashboard() {
  const { logoutUser } = useContext(AuthContext);
  
  return (
    <Box padding={'10px'}>
      <Box display={'flex'} justifyContent={'space-evenly'} mb={['10%', '10%', '5%']}>
        <Heading color={'green.600'} fontSize={'28px'}>Dashboard</Heading>
        <Text display={['none', 'none', 'block']}>Welcome❤️{userDetails.name}</Text>
        <Button bg='black' color={'red'} onClick={logoutUser}>Logout</Button>
      </Box>
      <Text fontSize={'23px'}><Link to={'/tophead'}>Top Headlines</Link></Text>
      <Text fontSize={'23px'}><Link to={'/every'}>Every Thing</Link></Text>
    </Box>
  );
}

export default Dashboard;
