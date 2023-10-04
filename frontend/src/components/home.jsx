import React, { useEffect } from 'react'
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react";
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user){
      navigate("/chats");
    }
  },[navigate])

  return (
    <Container maxW='xl' centerContent>
      <Box 
        d='flex' 
        justifyContent='center' 
        p={1} 
        bg={"#dadbda"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
        <Text fontSize='4xl'>
          MyChat-App
        </Text>
      </Box>
      <Box bg="#dadbda" w="100%" p={2} borderRadius="lg" borderWidth="1px" color="black">
      <Tabs variant='soft-rounded'>
      <TabList mb="1em">
        <Tab width="50%">Login</Tab>
        <Tab width="50%">SignUp</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>
            <Login />
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            <Signup/>
          </p>
        </TabPanel>
      </TabPanels>
    </Tabs>
      </Box>
    </Container>
  )
}

export default Home
