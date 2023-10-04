import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, FormControl, IconButton, Input, Spinner, Text, Toast, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getSender,getSenderFull } from '../config/ChatLogic'
import { ChatState } from '../Context/ChatProvider'
import ProfileModel from './Miscellaneous/ProfileModel'
import UpdateGroupChatModel from './Miscellaneous/UpdateGroupChatModel'
import '../components/styles.css'
import ScrollableChat from './ScrollableChat'
import io from "socket.io-client";
import Lottie from "react-lottie"
import animationData from "./animations/typing.json"
const ENDPOINT="http://localhost:5000";
var socket,selectedChatCompare;


const SingleChat = ({fetchAgain,setFetchAgain}) => {

    const defaultOptions ={
        loop:true,
        autoplay: true,
        animationData:animationData,
        rendererSettings:{
            preserveAspectRatio:"xMidYMid slice"
        }
    }
    const [messages, setMessages] = useState([]);
    const [loading,setLoading] = useState(false);
    const [newMessage,setNewMessage] = useState();

    const { user,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification} = ChatState()

    const toast = useToast();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit('setup',user);
        socket.on('connected',()=>setSocketConnected(true))
        socket.on('typing',()=>setIsTyping(true))
        socket.on('stop typing',()=>setIsTyping(false))
    },[])
    const sendMessage=async (event)=>{
        if(event.key==="Enter" && newMessage){
            socket.emit('stop typing',selectedChat._id);
            try{
                setNewMessage("");
            const config={
                "Content-type": "application/json",
                headers:{
                    Authorization: `Bearer ${user.token}`,
                }
                }
                const {data}=await axios.post('/api/message',{
                    content: newMessage,
                    chatId: selectedChat._id
                },config)
                console.log("Hi this is data", data, selectedChat._id);
                socket.emit('new message',data);  
            setMessages([...messages,data]);
            }catch(error){
                toast({
                    title:"Error Occured",
                    description:"Failed to send Message",
                    status:"error",
                    duration:3000,
                    isClosable:true,
                    position:"bottom"
                })
            }
        }
    }

    const fetchMessages=async()=>{
        if(!selectedChat)
            return;
        try{
            setLoading(true);
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }
            const {data} = await axios.get(`/api/message/${selectedChat._id}`,config);
            setMessages(data);
            setLoading(false);
            socket.emit('join chat',selectedChat._id);
        }catch(error){
            toast({
                title:"Error Occured",
                description:"Failed to load the chats",
                statys:"error",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })
        }
    }

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])
    
    useEffect(() => {
        socket.on('message recieved',(newMessageRecieved)=>{
            console.log('Hi I recieved a new message' ,newMessageRecieved)
            if(!selectedChatCompare || selectedChatCompare._id !==newMessageRecieved.chat._id){
                if(!notification.includes(newMessageRecieved)){
                    setNotification([newMessageRecieved,...notification]);
                    setFetchAgain(!fetchAgain);
                }
            else{
                setMessages([...messages,newMessageRecieved]);
            }
        }
        else {
            setMessages([...messages, newMessageRecieved]);
        }
    })})
    
    const typingHandler = (e)=>{
        setNewMessage(e.target.value);
        if(!socketConnected)
            return;
        if(!typing){
            setTyping(true);
            socket.emit("typing",selectedChat._id)
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow-lastTypingTime;
            if(timeDiff>=timerLength && typing){
                socket.emit("stop typing",selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    }

    return (
    <>
     {selectedChat?(
        <>
            <Text
                fontSize={{base:"28px", md:"30px"}}
                pb={3}
                px={2}
                w="100%"
                display="flex"
                justifyContent={{base:"space-between"}}
                alignItems="center"
            >
            <IconButton
                display={{base:"flex", md:"none"}}
                icon={<ArrowBackIcon />}
                onClick={()=>{setSelectedChat("")}}
            />
            {!selectedChat.isGroupChat?(
                <>
                    {getSender(user,selectedChat.users)}
                    <ProfileModel user={getSenderFull(user,selectedChat.users)}/>
                </>
            ):(
                <>{selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModel 
                fetchAgain={fetchAgain} 
                setFetchAgain={setFetchAgain}
                fetchMessages={fetchMessages}
                />
                </>
            )}
            </Text>
            <Box
               display="flex"
               flexDir="column"
               justifyContent="flex-end"
               p={3}
               bg="white"
               w="100%"
               h="100%"
               borderRadius="lg"
               overflowY="hidden"
            >
                {loading?(<Spinner
                    size="xl"
                    w={20}
                    h={20}
                    alignSelf="center"
                    margin="auto"
                />):(
                    <div className="messages">
                        <ScrollableChat messages={messages}/>
                    </div>
                )}
                <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                    {isTyping?<Lottie
                        options={defaultOptions} 
                        width={70}
                        style={{marginBottom:10,marginLeft:0}}
                    />:""}
                    <Input 
                        variant="filled"
                        bg="#38B2AC"
                        placeholder='Enter a message'
                        onChange={typingHandler}
                        value={newMessage}
                    >

                    </Input>
                </FormControl>
            </Box>
        </>
     ):(
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100%"
        >
        <Text
            fontSize="3xl"
            pb={3}
        >
        Click on a user to start Chatting
        </Text>
        </Box>
     )}
    </>
  )
}

export default SingleChat
