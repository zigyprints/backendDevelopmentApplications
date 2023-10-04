import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#dadbda"
      __hover={{
        background: "white"
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user == null ? "" : user.name}
        src={user == null ? "" : user.pic}
      />
      <Box>
        <Text>{user == null ? "" : user.name}</Text>
        <Text fontSize="sm">
          <b>Email: </b>
          {user == null ? "" : user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
