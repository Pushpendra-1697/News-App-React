import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Dashboard() {
  return (
    <Box padding={'10px'}>
      <Navbar />
      <Text mb='3%' color={'red'} fontSize={'23px'}><Link to={'/every'}>Every Thing</Link></Text>
      <Text color={'red'} fontSize={'23px'}><Link to={'/tophead'}>Top Headlines</Link></Text>
    </Box>
  );
}

export default Dashboard;
