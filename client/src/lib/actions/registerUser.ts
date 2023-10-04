import axios from "axios";

export default async function registerUser(values: {
	username: string;
	password: string;
}) {
	try {
		console.log("registering user");
		const response = await axios.post(
			"http://localhost:3000/user/register",
			values,
			{
				withCredentials: true,
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		throw new Error(`Failed to register user: ${error}`);
	}
}
