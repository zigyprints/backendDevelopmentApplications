let users: { id: string; username: string }[] = [];

export const userJoin = (id: string, username: string): boolean => {
  let user = users.find((user) => user.username === username);

  if (user) {
    return false;
  }

  users.push({ id, username });

  return true;
};

export const userLeft = (id: string) => {
  users = users.filter((user) => user.id !== id);
};

export const getUsers = () => users;

// const users = [];

// let users: { id: string; username: string }[] = [];

// // Join user to chat
// function userJoin(id: string, username: string, room: string) {
//   const user = { id, username, room };

//   users.push(user);

//   return user;
// }

// // Get current user
// function getCurrentUser(id) {
//   return users.find((user) => user.id === id);
// }

// // User leaves chat
// function userLeave(id) {
//   const index = users.findIndex((user) => user.id === id);

//   if (index !== -1) {
//     return users.splice(index, 1)[0];
//   }
// }

// // Get room users
// function getRoomUsers(room) {
//   return users.filter((user) => user.room === room);
// }

// module.exports = {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers,
// };
