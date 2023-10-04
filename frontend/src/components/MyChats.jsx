import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getSender } from '../config/ChatLogic';
import { ChatState } from '../Context/ChatProvider'
import ChatLoading from './Miscellaneous/ChatLoading';
import GroupChatModel from './Miscellaneous/GroupChatModel';

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const {selectedChat, setSelectedChat,user, chats,setChats} = ChatState();
  const toast = useToast();
  const fetchChats=async()=>{
    try{
      const data = await axios.get("/api/chat",{
          headers:{
          Authorization: `Bearer ${user==null?"":user.token}`,
        }
      });
      setChats(data);
    }catch(err){
      console.log(err);
      toast({
        title:"Error Occured",
        description:"Failed to Load Chat",
        status:"error",
        
      })
    }
  }
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(loggedIn)
    fetchChats();
  },[fetchAgain])
  
  return (
    <Box
      display={{base:selectedChat?"none":"flex",md:"flex"}}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{base:"100%",md:"25%"}}
      borderRadius="lg"
      borderWidth="1px"
      h="98%"
      ml="20px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{base:"28px", md:"30px"}}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >My Chats
      <GroupChatModel>
        <Button
          display="flex"
          fontSize={{base:"17px",md:"5px",lg:"17px"}}
          rightIcon={<AddIcon />}>
          New Group Chat
        </Button>
        </GroupChatModel>
        </Box>
        <Box
          display="flex"
          flexDir="column"
          p={3}
          bg="#dadbda"
          w="100%"
          h="90%"
          borderRadius="lg"
          overflow="hidden"
        >
        {chats.data?(
          <Stack overflowY="scroll">
            {chats.data.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ):(
          <ChatLoading/>
        )}  
        </Box>
    </Box>
  )
}

export default MyChats
