let rooms: { room: string; usersID: string[] }[] = [];

export const roomJoin = (roomID: string, userID: string): boolean => {
  let room = rooms.find((room) => roomID === room.room);
  //   console.log(room, "==");

  if (room === undefined) {
    const newRoom = {
      room: roomID,
      usersID: [userID],
    };
    rooms.push(newRoom);

    return true;
  }

  let user = room?.usersID.find((user) => user === userID);

  if (user) {
    return false;
  }

  room?.usersID.push(userID);

  return true;
};

export const leaveRoom = (userId: string, roomID: string) => {
  let room = rooms.find((room) => roomID === room.room);

  const idx = room?.usersID.indexOf(userId);

  if (idx !== -1 && idx !== undefined) {
    room?.usersID.splice(idx, 1);
    console.log(rooms);

    return true;
  }

  return false;

  // const userIndex = room.usersID.indexOf(userId);

  // if (userIndex !== -1) {
  //   // Remove the user from the usersID array
  //   room.usersID.splice(userIndex, 1);
};

export const getRooms = () => rooms;
