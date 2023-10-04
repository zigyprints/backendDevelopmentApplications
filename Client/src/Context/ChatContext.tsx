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
  const [currentChat, setcurrentChat] = useState<any>(null)
  const [messages, setmessages] = useState<any>(null)
  const [messagesLoading, setmessagesLoading] = useState(false)
  const [newMessage, setnewMessage] = useState<any>(null)
  const [socket, setsocket] = useState<any>(null)
  const [OnlineUsers, setonlineUsers] = useState([])

  // # Socket Io #
  //connecting socket io
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setsocket(newSocket);

    return () => {
      newSocket.disconnect();
    }
  }, [user])

  useEffect(() => {
    if (socket === null) return
    socket.emit("addNewUser", user?._id)
    socket.on("getOnlineUsers", (res: []) => {
      setonlineUsers(res);
    })

    return () => {
      socket.off("getOnlineUsers");
    }
  }, [socket])

  // send message in socket io 
  useEffect(() => {
    if (socket === null) return
    const recipientId = currentChat?.members?.find((id: any) => id !== user?._id)
    console.log(recipientId);


    socket.emit("sendMessage", { ...newMessage, recipientId })
  }, [newMessage])

  // receive messages
  useEffect(() => {
    if (socket === null) return
    socket.on("getMessage", (res: any) => {
      if (currentChat?._id !== res.chatId) {
        return
      };
      setmessages((prev: any) => [...prev, res])
    });

    return () => {
      socket.off("getMessage")
    }
  }, [socket, currentChat])




  async function createChat(firstId: string, secondId: string) {
    try {
      const data = await axios.post("/api/chat", { firstId, secondId })
      setUserChats((prev: []) => [...prev, data])
    } catch (error: any) {
      return setuserChatsError(error)
    }
  }

  //Filter existing Chats
  useEffect(() => {
    async function getusers() {
      try {
        const data = await axios.get("/api/users")

        const pChats = data.data.filter((u: { _id: any; }) => {
          let isChatCreated = false;
          if (user._id == u._id) {
            return false
          }
          if (userChats) {
            isChatCreated = userChats?.some((chat: any) => {
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

  function updatecurrentChat(chat: {}) {
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
  async function sendMessage(senderId: string, chatId: string, text: string, settext: any) {
    if (!text) {
      return toast("must type something>>>")
    }
    try {
      const messageDetails = { senderId, chatId, text, settext }
      const response: any = await axios.post('/api/messages', messageDetails)
      setnewMessage(response)
      setmessages((prev: any) => [...prev, response])
      settext("")
    } catch (error: any) {
      toast("can't send message " + error.message)
    }
  }

  return (
    <ChatContext.Provider value={{
      userChats, isLoading, userChatsError,
      possibleChats, createChat, updatecurrentChat,
      messages, messagesLoading, sendMessage, currentChat,
      OnlineUsers
    }}>
      {children}
    </ChatContext.Provider>
  );

}