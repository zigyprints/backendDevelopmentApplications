import axios from "axios";
import React, { useContext, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { UserContext } from "../context/UserContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const NewGroupChat = () => {
	const [groupChatName, setGroupChatName] = useState();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const { toast } = useToast();

	const { user, chat, setChat } = useContext(UserContext);

	const handleSearch = async (query) => {
		console.log(query);
		setSearch(query);
		if (!query) {
			return;
		}
		try {
			const data = await axios.get(
				`http://localhost:3000/user/getAllUsers?search=${query}`,
				{
					withCredentials: true,
				}
			);
			// console.log(data.data.payload);

			setSearchResults(data.data.payload);
		} catch (error) {
			console.log(error);
			throw new Error(`Failed to getallusers user: ${error}`);
		}
	};

	const handleAdd = (user) => {
		// e.preventDefault();
		if (selectedUsers.includes(user)) {
			throw new Error(`user already added`);
			return;
		}
		setSelectedUsers([...selectedUsers, user]);
	};

	const handleDelete = (user) => {
		setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!groupChatName || !selectedUsers) {
			toast({
				variant: "destructive",
				title: "Pleae enter a username",
			});
		}

		try {
			const data = await axios.post(
				`http://localhost:3000/chat/createGroupChat`,
				{
					name: groupChatName,
					users: JSON.stringify(selectedUsers.map((u) => u._id)),
				},
				{
					withCredentials: true,
				}
			);
			// console.log(data.data.payload);
			setChat([data.data.payload, ...chat]);
			toast({
				variant: "success",
				title: "created group chat!",
			});
		} catch (error) {
			console.log(error);
			toast({
				variant: "destructive",
				title: `${error.message}`,
			});
		}
	};
	return (
		<Dialog>
			<DialogTrigger>
				<Button>Create GroupChat</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Search for users</DialogTitle>
					<DialogDescription>
						<form onSubmit={handleSubmit} className='p-4'>
							{selectedUsers.map((user) => (
								<div className='flex' key={user._id}>
									<h2>{user.username}</h2>
									<Button onClick={() => handleDelete(user)}>X</Button>
								</div>
							))}
							<Input
								type='text'
								placeholder='Chat Name'
								onChange={(e) => setGroupChatName(e.target.value)}
								value={groupChatName}
								className='p-4'
							/>
							<Input
								type='text'
								placeholder='Add users to group'
								onChange={(e) => handleSearch(e.target.value)}
								className='p-4'
							/>

							{searchResults.map((user) => (
								<div className='flex' key={user._id}>
									<h2>{user.username}</h2>
									<Button onClick={() => handleAdd(user)}>Add</Button>
								</div>
							))}
							<Button type='submit'>CREATE GROUP</Button>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default NewGroupChat;
