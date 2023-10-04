import { z } from "zod";

export const registerSchema = z.object({
	username: z
		.string()
		.min(2, { message: "Username must be at least 2 characters long" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});
