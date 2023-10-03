import Chatlist from "@/Componets/Chatlist";
import Chatbox from "@/Componets/Chatbox";
import { useState, useContext, useEffect } from "react";
import { ChatContext } from "@/Context/ChatContext";
import { UserContext } from '@/Context/UserContext'
import Possiblechats from "@/Componets/Possiblechats";

export default function Chat() {
    const { userChats, updatecurrentChat, isLoading } = useContext(ChatContext)
    const { User } = useContext(UserContext)


    return (
        <>
            <div>
                <Possiblechats/>
            </div>
            <div className="flex">
                <div className="py-8 px-2 w-[30vw] bg-white dark:bg-slate-700 dark:text-white flex-shrink-0 rounded-r-2xl my-6">
                        <div className="text-xl text-center">
                            <span className="font-bold ">Active Conversations</span>
                        </div>
                        {isLoading && <p>Loading Chats</p>}
                        {userChats?.map((chat:any,index:number) => {
                            return(
                                <div key={index} onClick={()=> updatecurrentChat(chat)}>
                                    <Chatlist chat={chat} user={User} />
                                </div>
                            )
                        })}
                </div>
                <Chatbox />
            </div>
        </>
    )
};
