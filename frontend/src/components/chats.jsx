import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import {Box} from "@chakra-ui/react";
import SideDrawer from './Miscellaneous/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';

const Chats = () => {
  const {user} = ChatState();
  const [fetchAgain,setFetchAgain] = useState(false);
  return (
    <div style={{width:'100%'}}>
      <SideDrawer/>
      <Box display='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default Chats
