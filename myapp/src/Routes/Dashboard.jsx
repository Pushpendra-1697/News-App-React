import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

let userDetails = JSON.parse(localStorage.getItem('userDetails')) || "";
function Dashboard() {
  const { logoutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);



  const getCardData = async () => {
    try {
      let res = await fetch();
      res = await res.json();
      setLoading(false);
      setIsError(false);
    } catch (err) {
      setIsError(true);
    }
  };

  return (
    <Box padding={'10px'}>
      <Box display={'flex'} justifyContent={'space-evenly'} mb={['10%', '10%', '5%']}>
        <Heading color={'green.600'} fontSize={'28px'}>Dashboard</Heading>
        <Text display={['none', 'none', 'block']}>Welcome❤️{userDetails.name}</Text>
        <Button bg='black' color={'red'} onClick={logoutUser}>Logout</Button>
      </Box>
      {isError && <Error />}
      {loading && <Loading />}
    </Box>
  );
}

export default Dashboard;
