import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    FormControl,
    Input,
    Box,
  } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModel = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers,setSelectedUsers] = useState([]);
    const [search, setSearch] = useState(); 
    const [searchResults,setSearchResults] = useState([]);
    const [loading,setLoading] = useState(false);

    const toast = useToast();
    const {user,chats,setChats}=ChatState();
    const handleSearch=async (query)=>{
        setSearch(query);
        if(!query){
            return;
        }
        try{
            setLoading(true);
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                },
            }
            const {data}=await axios.get(`/api/user?search=${search}`,config);
            console.log(data);
            setLoading(false);
            setSearchResults(data);
        }catch(err){
            toast({
                title:"Error Occured",
                description:"Failed to load search results",
                  status:"error",
                  duration:3000,
                  isClosable:true,
                  position:'bottom-left'
                })
                
            }
        }

    const handleSumbit=async ()=>{
        
        if(!groupChatName || !selectedUsers){
            toast({
                title:"Please Fill all the Fields",
                status:"warning",
                duration:3000,
                isClosable:true,
                position:"top"
            });
            return;
        }
        setLoading(true);
        try{
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                },
            }
            const {data} = await axios.post('/api/chat/group',{
                name:groupChatName,
                users:JSON.stringify(selectedUsers.map(u=>u._id))
            },config);
            console.log(chats);
            console.log(data);
            if(!chats){setChats([data, ...chats]);}
            onClose();
            setLoading(false);
            toast({
                title:"New Group Chat Created",
                status:"success",
                duration:3000,
                isClosable:true,
                position:"bottom"
            });
        }catch(err){
            setLoading(false);
            console.log(err);
            toast({
                title:"Error",
                description:"Group cannot be created",
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom"
            });
            return;
        }
    }
    const handleGroup=(userToAdd)=>{
        if(selectedUsers.includes(userToAdd)){
            toast({
                title:"User Already added",
                status:"warning",
                duration:3000,
                isClosable:true,
                position:"top",
            })
            return;
        }
        setSelectedUsers([...selectedUsers,userToAdd])
    }

    const handleDelete=(delUser)=>{
        setSelectedUsers(selectedUsers.filter(sel=>sel._id!==delUser._id))
    }
  return (
    <div>
      <span onClick={onOpen}>{children}</span>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader
        fontSize="35px"
        display="flex"
        justifyContent='center'    
    >Create Group Chat</ModalHeader>
    <ModalCloseButton />
    <ModalBody display="flex" flexDir="column" alignItems="center">
      <FormControl >
        <Input placeHolder="Chat Name" mb={3} onChange={(e)=>{setGroupChatName(e.target.value)}}/>
      </FormControl>
      <FormControl >
        <Input placeHolder="Add Users" mb={3} onChange={(e)=>{handleSearch(e.target.value)}}/>
      </FormControl>
      <Box display="flex" flexwrap="wrap">
      {selectedUsers?.map((u)=>{
        return (
                <UserBadgeItem key={u._id} user={u} handleFunction={()=>{handleDelete(u)}}/>
            )
      })}
      </Box>
      {loading ? (
              // <ChatLoading />
              <div isLoading={loading}>Loading..</div>
            ) : (
              searchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
    </ModalBody>

    <ModalFooter>
      <Button variant='solid' mr={3} onClick={handleSumbit} onLoading={loading}>Create Chat</Button>
      <Button colorScheme='blue'  onClick={onClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </div>
  )
}

export default GroupChatModel
