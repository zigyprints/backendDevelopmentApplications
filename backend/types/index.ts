/**
 * Represents a message object containing information about a message, image, username, and room.
 */
export type Message = {
  username: string; // The username of the sender
  message?: string; // The text message (optional)
  img?: string; // The image URL (optional)
  room: string; // The room in which the message is sent
};

/**
 * Represents a user object with a unique identifier and a username.
 */
export type User = {
  id: string; // The unique identifier for the user
  username: string; // The username of the user
};

/**
 * Represents a room object with a unique identifier and an array of user IDs.
 */
export type Room = {
  room: string; // The unique identifier for the room
  usersID: string[]; // An array of user IDs in the room
};
