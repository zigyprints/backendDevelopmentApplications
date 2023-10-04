import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

type ContextProps = {
  children: React.ReactNode,
  user: any
}

export type UserContextData = {
  User: any,
  setUser: any
}

export const ChatContext = createContext({});

export function ChatContextProvider({ children, user }: ContextProps) {
  const [userChats, setUserChats] = useState<any>(null);
  const [userChatsError, setuserChatsError] = useState(null);
  const [isLoading, setisLoading] = useState(true)
  const [possibleChats, setpossibleChats] = useState([])
  const [currentChat,setcurrentChat] = useState<any>(null)
  const [messages,setmessages] = useState(null)
  const [messagesLoading,setmessagesLoading] =  useState(false)
  const [newMessage, setnewMessage] = useState(null)
  const [Socket, setSocket] = useState<any>(null)
  const [OnlineUsers, setonlineUsers] = useState([])

  // # Socket Io #
  //connecting socket io
  useEffect(()=>{
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () =>{
      newSocket.disconnect();
    }
  },[user])

  useEffect(()=>{
    if(Socket === null ) return
    Socket.emit("addNewUser",user?._id) 
    Socket.on("getOnlineUsers",(res)=>{
      setonlineUsers(res);
    })

    return () =>{
      Socket.off("getOnlineUsers");
    }
  },[Socket])

// send message in socket io 
useEffect(()=>{
  if(Socket === null ) return
  const recipientId = currentChat?.members?.find((id) => id !== user?._id)
  console.log(recipientId);
  
  
  Socket.emit("sendMessage",{...newMessage,recipientId}) 
},[newMessage])

// receive messages
useEffect(()=>{
  if(Socket === null ) return
  Socket.on("getMessage", res => {
    if(currentChat?._id !== res.chatId){
      return
    };
    setmessages((prev)=>[...prev,res])
  });

  return ()=>{
    Socket.off("getMessage")
  }
},[Socket, currentChat])




  async function createChat(firstId:string,secondId:string){
    try {
      const data = await axios.post("/api/chat",{firstId,secondId})
      setUserChats((prev:[])=> [...prev,data])
    } catch (error:any) {
      return setuserChatsError(error)
    }
  }  

  //Filter existing Chats
  useEffect(() => {
    async function getusers() {
      try {
        const data = await axios.get("/api/users")
        
        const pChats = data.data.filter((u) => {
          let isChatCreated = false;
          if (user._id == u._id) {
            return false
          }
          if (userChats) {
            isChatCreated = userChats?.some((chat) => {
              return chat.members[0] === u._id || chat.members[1] === u._id
            })
          }
          
          return !isChatCreated
        })
        setpossibleChats(pChats)
      } catch (error: any) {
        return setuserChatsError(error)
      }
    }

    getusers()
  }, [userChats])


  //fetches all the existing chats
  useEffect(() => {
    async function getuserChats() {
      try {
        setisLoading(true) 
        const data = await axios.get(`/api/chat/${user?._id}`)
        setUserChats(data.data);
        setisLoading(false)
      } catch (error: any) {
        return setuserChatsError(error)
      }
    }
    getuserChats()
  }, [user])

  function updatecurrentChat(chat:{}) {
    setcurrentChat(chat)
  }
  

  //fetching messages for the current user
  useEffect(() => {
    async function getmessages() {
      try {
        setmessagesLoading(true)
        const data = await axios.get(`/api/messages/${currentChat?._id}`)
        setmessages(data.data);
        setmessagesLoading(false)
      } catch (error: any) {
        return setuserChatsError(error)
      }
    }
    getmessages()
  }, [currentChat])


  //sending message
  async function sendMessage(senderId,chatId,text,settext) {
    if (!text) {
      return toast("must type something>>>")
    }
    try {
        const messageDetails = {senderId,chatId,text,settext}
        const response = await axios.post('/api/messages',messageDetails)
        console.log(response);
        
        // setnewMessage(response)
        // setmessages((prev)=>[...prev,response])
        settext("")
    } catch (error:any) {
        toast("can't send message "+ error.message)
    }
}
  
  return (
    <ChatContext.Provider value={{ 
      userChats, isLoading, userChatsError, 
      possibleChats , createChat ,updatecurrentChat,
      messages, messagesLoading,sendMessage,currentChat,
      OnlineUsers
      }}>
      {children}
    </ChatContext.Provider>
  );

}