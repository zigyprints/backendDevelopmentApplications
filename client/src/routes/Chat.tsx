import axios from "axios";
import Cookies from "js-cookie";
import { Send } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchNav from "../components/SearchNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import ChatLogs from "../components/ChatLogs";
import MyContacts from "../components/MyContacts";
import NewGroupChat from "../components/NewGroupChat";
import { UserContext } from "../context/UserContext";

export default function Chat() {
	const navigate = useNavigate();
	const { setUsername, username, setId, id } = useContext(UserContext);

	useEffect(() => {
		axios
			.get("http://localhost:3000/user/getCurrentUser", {
				withCredentials: true,
			})
			.then((response) => {
				setUsername(response.data.payload.username);
				setId(response.data.payload.id);
				// console.log(response);
			});
	}, [username, setId, setUsername]);

	const handleSignOut = () => {
		Cookies.remove("token");
		setUsername("");
		navigate("/");
	};

	return (
		<div className='flex h-screen p-2'>
			<div className='w-1/4 flex flex-col'>
				<h1 className='text-4xl'>WHISPER</h1>
				<h1>Welcome {username}</h1>
				<NewGroupChat />

				<Button onClick={handleSignOut} className='w-[100px]'>
					SIGN OUT
				</Button>
				{/* <Sheet>
					<SheetTrigger asChild>
						<Button variant='outline'>Search Users</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Search For User</SheetTitle>
							<SheetDescription>
								Click on a user below to start a conversation
							</SheetDescription>
						</SheetHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='username' className='text-right'>
									Username
								</Label>
								<Input id='username' value='@peduarte' className='col-span-3' />
							</div>
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button type='submit'>Save changes</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet> */}
				<SearchNav />
				<MyContacts />
			</div>
			<div className='w-3/4 p-2 flex flex-col '>
				<ChatLogs />

				<div className='flex flex-row gap-2'>
					<Input placeholder='start typing here' className=' p-2' type='text' />
					<Button>
						<Send />
					</Button>
				</div>
			</div>
			{/* <h1>WELCOME {username} TO WHISPER!!!!</h1> */}
			{/* <Avatar>
				<AvatarImage src={""} alt='@shadcn' />
				<AvatarFallback>{username}</AvatarFallback>
			</Avatar> */}
		</div>
	);
}
