// import axios from "axios";
import { Heading1 } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "./ui/button";
const ChatLogs = () => {
	const { selectedChat, setSelectedChat, id } = useContext(UserContext);
	// console.log(selectedChat);
	const getSender = (id, users) => {
		return users[0]._id == id ? users[1].username : users[0].username;
	};
	// console.log(selectedChat);
	return (
		<div className='flex-grow'>
			<Button onClick={() => setSelectedChat("")}>CLEAR</Button>
			{selectedChat ? (
				<div>
					<h1>HERE ARE THE CHATS</h1>
					{!selectedChat.isGroupChat ? (
						<p>{getSender(id, selectedChat.users)}</p>
					) : (
						<>
							<p>{selectedChat.chatName}</p>
						</>
					)}
				</div>
			) : (
				<h1>PLEASE SELECT A CONVERSATION TO VIEW</h1>
			)}
		</div>
	);
};

export default ChatLogs;
