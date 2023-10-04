import { User } from "types";

// Create an array to store user data
let users: User[] = [];

/**
 * Add a user to the users array if the username is not already taken.
 * @param {string} id - The user's unique identifier.
 * @param {string} username - The username to be added.
 * @returns {boolean} - Returns true if the user was added, false if the username is taken.
 */
export const userJoin = (id: string, username: string): boolean => {
  // Check if the username is already in use
  const user = users.find((user) => user.username === username);

  if (user) {
    return false; // Username is already taken
  }

  // Add the user to the array
  users.push({ id, username });

  return true; // User added successfully
};

/**
 * Remove a user from the users array based on their unique identifier.
 * @param {string} id - The user's unique identifier.
 */
export const userLeft = (id: string): void => {
  // Filter out the user with the specified ID
  users = users.filter((user) => user.id !== id);
};

/**
 * Get the username of a user based on their unique identifier.
 * @param {string} id - The user's unique identifier.
 * @returns {string | undefined} - Returns the username or undefined if the user is not found.
 */
export const getUser = (id: string): string | undefined => {
  // Find the user with the specified ID
  const user = users.find((user) => user.id === id);

  return user?.username; // Return the username or undefined if not found
};

/**
 * Get an array of all users currently in the chat.
 * @returns {User[]} - An array of user objects.
 */
export const getUsers = (): User[] => users;
