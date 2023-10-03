import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  async function createChat(firstId,secondId){
    console.log({firstId,secondId});
    
    try {
      const data = await axios.post("/api/chat",{firstId,secondId})
      setUserChats((prev)=> [...prev,data])
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

  return (
    <ChatContext.Provider value={{ userChats, isLoading, userChatsError, possibleChats , createChat}}>
      {children}
    </ChatContext.Provider>
  );

}