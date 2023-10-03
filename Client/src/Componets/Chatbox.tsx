import { ChatContext } from '@/Context/ChatContext'
import { UserContext } from '@/Context/UserContext'
import { useFetchRecipient } from '@/hooks/useFetchRecipient'
import { cn } from '@/lib/utils'
import { useContext,useState } from 'react'
import moment from 'moment'


export default function Chatbox() {
    const { User } = useContext(UserContext)
    const { currentChat, messages, messagesLoading, sendMessage } = useContext(ChatContext)
    const { recipientuser } = useFetchRecipient(currentChat, User)    

    const [textMessage,settextMessage] = useState<string>("")
    

    if (!recipientuser) {
        return (
            <div className='flex text-3xl font-bold text-white mx-auto items-center h-screen'>
                No Conversation yet ...
            </div>
        )
    }
    
    return (
        <div className="flex h-screen w-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col flex-auto h-full p-6">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 dark:bg-slate-400 h-full p-4">
                        <div className="flex flex-col h-screen">
                            {messages && messages.map((messages, index) => (
                                <div 
                                className={cn(`relative w-fit items-end mx-4 my-3 bg-indigo-100  py-2 px-4 shadow rounded-xl text-right grow-0`, messages?.senderId == User?._id && "bg-emerald-100 ml-[50vw]")} 
                                key={index}>
                                    <div className='font-semibold'>{messages.text}</div>
                                    <div className='font-semibold text-sm'>{moment(messages.createdAt).calendar()}</div>
                                </div>

                            ))}
                        </div>

                        <div className="flex flex-row items-center h-16 rounded-xl bg-emerald-100 dark:bg-slate-600 w-full px-4">
                            <div className="flex-grow ml-4">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Your Message..."
                                        className="flex w-full border-2 rounded-xl focus:outline-none focus:border-indigo-500 pl-4 h-10"
                                        value={textMessage}
                                        onChange={(ev)=>settextMessage(ev.target.value)}
                                    />
                                    <button
                                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="ml-4" onClick={()=> sendMessage(User,currentChat._id,textMessage,settextMessage)}>
                                <button
                                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                >
                                    <span>Send</span>
                                    <span className="ml-2">
                                        <svg
                                            className="w-4 h-4 transform rotate-45 -mt-px"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};
