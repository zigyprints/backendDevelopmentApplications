import { useFetchRecipient } from "@/hooks/useFetchRecipient"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Chatlist({ chat, user }) {
    const { recipientuser } = useFetchRecipient(chat, user)
    
    return (
        <div className="flex space-y-1 px-8 justify-between mt-4 h-fit text-sm" >
            <div className="flex">
                <div className="m-1">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="text-left flex flex-col space-y-2">
                    <div className="font-bold">{recipientuser?.name}</div>
                    <div>textMessage</div>
                </div>
            </div>
            <div className="text-right flex flex-col space-y-2">
                <div>13/14/23</div>
                {/* <span className="rounded-full px-2 py-1 w-fit bg-green-700 ml-20">2</span> */}
            </div>
        </div>
    )
};

