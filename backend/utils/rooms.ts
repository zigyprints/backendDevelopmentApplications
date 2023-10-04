import { Room } from "types";

// Create an array to store room data
let rooms: Room[] = [];

/**
 * Add a user to a room if they are not already a member.
 * @param {string} roomID - The unique identifier for the room.
 * @param {string} userID - The unique identifier for the user.
 * @returns {boolean} - Returns true if the user was added to the room, false if the user is already a member of the room.
 */
export const roomJoin = (roomID: string, userID: string): boolean => {
  const room = rooms.find((room) => roomID === room.room);

  if (!room) {
    // If the room does not exist, create a new room and add the user
    const newRoom = {
      room: roomID,
      usersID: [userID],
    };
    rooms.push(newRoom);

    return true;
  }

  const user = room?.usersID.find((user) => user === userID);

  if (user) {
    return false; // User is already a member of the room
  }

  // Add the user to the room
  room.usersID.push(userID);

  return true;
};

/**
 * Remove a user from a room.
 * @param {string} userID - The unique identifier for the user.
 * @param {string} roomID - The unique identifier for the room.
 * @returns {boolean} - Returns true if the user was successfully removed from the room, false if the user was not found in the room.
 */
export const leaveRoom = (userID: string, roomID: string): boolean => {
  const room = rooms.find((room) => roomID === room.room);

  if (room) {
    const idx = room.usersID.indexOf(userID);

    if (idx !== -1) {
      // Remove the user from the room's usersID array
      room.usersID.splice(idx, 1);

      return true;
    }
  }

  return false;
};

/**
 * Get an array of all rooms.
 * @returns {Room[]} - An array of room objects.
 */
export const getRooms = (): Room[] => rooms;
