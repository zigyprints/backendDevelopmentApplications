import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";

const MyContacts = () => {
	const { selectedChat, setSelectedChat, chat, setChat, id } =
		useContext(UserContext);

	const fetchChats = async () => {
		try {
			const data = await axios.get(`http://localhost:3000/chat/`, {
				withCredentials: true,
			});
			// console.log(data.data.payload);

			setChat(data.data.payload);
		} catch (error) {
			console.log(error);
			throw new Error(`Failed to login user: ${error}`);
		}
	};
	// console.log(chat);

	//JUST TO DISPLAY NAME IF NOT GROUPCHAT
	const getSender = (id, users) => {
		return users[0]._id == id ? users[1].username : users[0].username;
	};
	useEffect(() => {
		fetchChats();
	});
	return (
		<div className='flex flex-col'>
			<h1 className='text-lg'>MESSAGES</h1>
			{chat.map((contact) => (
				<Card key={contact._id}>
					<CardTitle>
						{!contact.isGroupChat
							? getSender(id, contact.users)
							: contact?.chatName}
					</CardTitle>

					<Button onClick={() => setSelectedChat(contact)}>OPEN</Button>
				</Card>
			))}
		</div>
	);
};

export default MyContacts;
