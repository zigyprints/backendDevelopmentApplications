import React, { useState } from "react";
import {
  Container,
  Box,
  Menu,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  Button,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Toast,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios"
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogic";

const SideDrawer = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user,setSelectedChat,chats, setChats ,notification, setNotification} = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const Toast = useToast();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleSearch=async ()=>{
    setLoading(true);
    if(!search){
      Toast({
        title:"Please Enter Something to Search",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top-left"
      })
      setLoading(false);
    }
    else{
      
      try{
        const config={
          headers:{
            Authorization:`Bearer ${user==null?"":user.token}`
          }
        }
        const  {data} = await axios.get(`/api/user?search=${search}`,config);
        setSearchResult(data);
        setLoading(false);
      }
      catch(err){
        Toast({
          title:"Error Occured",
          status:"error",
          duration: 3000,
          isClosable:true,
          position:"top-left"
        })
        setLoading(false);
      }
    }
  }

  const accessChat = async (userId)=>{
    setLoadingChat(true);
    try{
      const config={
        "Content-type": "application/json",
        headers:{
          Authorization: `Bearer ${user.token}`,
        }
      }
      const { data } = await axios.post('/api/chat',{userId},config);
      console.log(chats)
      if(!chats?.data?.find((c)=>c._id===data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    }catch(err){
      console.log(err)
      Toast({
        title:"Error Occured",
        status:"error",
        duration: 3000,
        isClosable:true,
        position:"top-left"
      })
      setLoading(false);
    }
  }
  return (
    <>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="#dadbda"
      w="98%"
      p="5px 10px 5px 10px"
      borderWidth="1px"
      borderRadius="lg"
      margin="10px 10px 10px 10px"
    >
      <Tooltip label="Search Users to chat" hasArrow plaement="bottom-end">
        <Button 
          variant="solid" 
          onClick={onOpen}
          >
          <i class="fa-solid fa-magnifying-glass"></i>
          <Text display={{ base: "none", md: "flex" }} px="4">
            Search User
          </Text>
        </Button>
      </Tooltip>
      <Text fontSize="3xl">Heading</Text>
      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize="2xl" m={1}></BellIcon>
          </MenuButton>
           <MenuList pl={2}>
            {!notification.length?"No New Messages":
            notification.map((noti)=>(
              <MenuItem key={noti._id} onClick={()=>{
                setSelectedChat(noti.chat);
                setNotification(notification.filter((n)=>n!==noti))
              }}>
                {noti.chat.isGroupChat?
                `New Message in ${noti.chat.chatName}`:
                `New Message from ${getSender(user,noti.chat.users)}`}
              </MenuItem>
            ))}
           </MenuList> 
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              src={user==null?"":user.pic}
              name={user==null?"":user.name}
            />
          </MenuButton>
          <MenuList>
            <ProfileModel user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModel>
            <MenuDivider></MenuDivider>
            <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} bg="#dadbda">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" >
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input 
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              <Button onClick={handleSearch} isLoading={loading}>Go</Button>
            </Box>
            {loading===true?(
                <ChatLoading />
            ):(
                searchResult?.map((user)=>
                  <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={()=>accessChat(user._id)}
                  />
                )
            )}
            {loadingChat && <Spinner ml="auto" display="flex"/>}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    </>
  );
};

export default SideDrawer; 
