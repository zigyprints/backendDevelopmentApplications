import { ChatContext } from "@/Context/ChatContext";
import { UserContext } from "@/Context/UserContext";
import { useContext } from "react";

export default function Possiblechats() {
    const { User } = useContext(UserContext)
    const { possibleChats, createChat } = useContext(ChatContext)
    // console.log(possibleChats)
    return (
        <div className="flex gap-3 my-3 mx-4">
            {possibleChats && possibleChats.map((u,index) => {
                return (
                    <div className=" bg-emerald-500 px-3 py-2 text-white rounded-full cursor-pointer" key={index} 
                    onClick={()=>createChat(User._id,u._id)}>
                        {u.name}
                    </div>
                )
            })}
        </div>
    )

};
