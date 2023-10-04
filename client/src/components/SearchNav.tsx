import axios from "axios";
import { useContext, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../components/ui/sheet";
import { UserContext } from "../context/UserContext";
import { Card } from "./ui/card";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

const SearchNav = () => {
	const { selectedChat, setSelectedChat, chat, setChat } =
		useContext(UserContext);

	const { toast } = useToast();
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	async function handleAccessChat(userId) {
		// console.log(userId);
		try {
			console.log("registering user");
			const response = await axios.post(
				"http://localhost:3000/chat/accessChat",
				{ id: userId },
				{
					withCredentials: true,
				}
			);
			if (!chat.find((c) => c._id === response.data.payload._id))
				setChat([response.data.payload, ...chat]);
			setSelectedChat(response.data.payload);
		} catch (e) {
			console.log(e);
			throw new Error(`Failed to crate chat : ${e}`);
		}
	}

	const handleSearch = async () => {
		if (!search) {
			toast({
				variant: "destructive",
				title: "Pleae enter a username",
				// description: "Please",
				// action: <ToastAction altText='Try again'>Try again</ToastAction>,
			});
		}
		try {
			const data = await axios.get(
				`http://localhost:3000/user/getAllUsers?search=${search}`,
				{
					withCredentials: true,
				}
			);
			console.log(data.data.payload);

			setSearchResults(data.data.payload);
		} catch (error) {
			console.log(error);
			throw new Error(`Failed to login user: ${error}`);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Search Users</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Search For User</SheetTitle>
					<SheetDescription>Search for user based on username</SheetDescription>
				</SheetHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='username' className='text-right'>
							Username
						</Label>
						<Input
							value={search}
							className='col-span-3'
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Button onClick={handleSearch}>Search</Button>
					</div>
				</div>
				{searchResults.map((user) => (
					<Card key={user._id}>
						<div className='flex'>
							<h2>{user.username}</h2>
							<Button onClick={() => handleAccessChat(user._id)} type='submit'>
								Chat
							</Button>
						</div>
					</Card>
				))}
				<SheetFooter>
					<SheetClose asChild>
						<Button type='submit'>Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default SearchNav;
