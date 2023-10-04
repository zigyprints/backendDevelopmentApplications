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
    IconButton,
    useToast,
    Box,
    FormControl,
    Input,
    Spinner,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModel = ({fetchAgain,setFetchAgain,fetchMessages}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatname,setGroupChatName] = useState();
    const [search,setSearch] = useState("")
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [renameLoading,setRenameLoading] = useState(false);
    const toast = useToast();

    const {user,selectedChat,setSelectedChat} = ChatState();
    const handleRemove=async (user1)=>{
        if(selectedChat.groupAdmin._id!==user._id && user1._id!==user._id){
            toast({
                title:"Only admins can remove someone!",
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.put('/api/chat/groupremove',{
                chatId:selectedChat._id,
                userId:user1._id
            },config);
            user1._id===user._id?setSelectedChat():setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            toast({
                title:"Error Occured",
                description:error.response.data.message,
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })
            setLoading(false);
        }
    }

    const handleRename=async ()=>{
        if(!groupChatname)
            return;
        try{
            setRenameLoading(true);
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.put('/api/chat/rename',{
                chatId:selectedChat._id,
                chatName:groupChatname
            },config)
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        }catch(err){
            toast({
                title:"Error Occured",
                description:err.response.data.message,
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })
            setRenameLoading(false);
            
        }
        setGroupChatName("")
    }
    
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
            setLoading(false);
            setSearchResult(data);
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

    const handleAddUser = async(user1)=>{
        if(selectedChat.users.find((u)=>u._id===user1._id)){
            toast({
                title:"User Already Present",
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom",
            })
            return;
        }
        if(selectedChat.groupAdmin._id!==user._id){
            toast({
                title:"Only Admins can Add Someone",
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.put('/api/chat/groupadd',{
                chatId:selectedChat._id,
                userId:user1._id
            },config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title:"Error Occured",
                description:error.response.data.message,
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })
            setLoading(false);
        }
    }
    
    return (
        <>
        <IconButton 
            display={{base:"flex"}}
            icon={<ViewIcon />}
            isCentered
        onClick={onOpen}>Open Modal</IconButton>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
                fontSize="35px"

            >{selectedChat.chatName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box
                    w="100%"
                    display="flex"
                    flexWrap="wrap"
                    pb={3}
                >
                    {selectedChat.users.map((u)=>
                        (<UserBadgeItem 
                            key={u._id}
                            user={u}
                            handleFunction={()=>
                                handleRemove(u)
                            }/>)
                    )}
                </Box>
                <FormControl display="flex">
                    <Input
                        placeholder="Chat Name"
                        mb={3}
                        value={groupChatname}
                        onChange={(e)=>setGroupChatName(e.target.value)}
                    />
                    <Button
                        variant="solid"
                        colorScheme="gray"
                        ml={1}
                        isLoading={renameLoading}
                        onClick={handleRename}
                    >
                    Update
                    </Button>
                </FormControl>
                <FormControl display="flex">
                    <Input
                        placeholder="Add Users to group"
                        mb={1}
                        onChange={(e)=>handleSearch(e.target.value)}
                    />
                </FormControl>
                {loading?(
                    <Spinner size="lg"/>):(
                        searchResult.map((u)=>(
                            <UserListItem 
                                key={u._id}
                                user={u}
                                handleFunction={()=>handleAddUser(u)}
                            />
                        ))
                    )}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme='red' onClick={()=>handleRemove(user)}>Leave Group</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )
}

export default UpdateGroupChatModel
