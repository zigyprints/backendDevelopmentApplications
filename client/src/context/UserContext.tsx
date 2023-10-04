import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const [username, setUsername] = useState(null);
	const [id, setId] = useState(null);
	const [selectedChat, setSelectedChat] = useState();
	const [chat, setChat] = useState([]);

	return (
		<UserContext.Provider
			value={{
				username,
				setUsername,
				id,
				setId,
				selectedChat,
				setSelectedChat,
				chat,
				setChat,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
