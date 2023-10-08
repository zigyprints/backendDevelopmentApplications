# Chat Room Application Readme

-   [Assumptions](#assumptions)
-   [Challenges Faced](#challenges-faced)
-   [Improvements](#improvements)
-   [Basic Working of the Room](#basic-working-of-the-room)
-   [Data Structures](#data-structures)
-   [Events](#events)
    -   [connection](#connection)
    -   [join_server](#join_server)
    -   [create_room](#create_room)
    -   [delete_room](#delete_room)
    -   [join_room](#join_room)
    -   [leave_room](#leave_room)
    -   [send_message](#send_message)
    -   [disconnecting](#disconnecting)
    -   [disconnect](#disconnect)
-   [Emitted Events](#emitted-events)
    -   [server_joined](#server_joined)
    -   [room_created](#room_created)
    -   [room_deleted](#room_deleted)
    -   [room_joined](#room_joined)
    -   [room_left](#room_left)
    -   [new_message](#new_message)
-   [Error Handling](#error-handling)
    -   [error_status](#error_status)
-   [Postman Documentation](#postman-documentation)

## Assumptions

-   **Data Storage**: All data is stored on the server, including user information, room details, and messages. Clients interact with the server to retrieve and manipulate this data.

-   **Image Sharing**: Image sharing is accomplished by encoding images as base64 strings. This allows images to be treated as text messages within the application, simplifying storage and transmission.

## Challenges Faced

-   **Learning Socket.io**: As someone who had never worked with Socket.io before, I had to spend time researching and learning about its concepts and usage.

-   **Adapting to Version Changes**: When faced with certain concepts that I might not have come across during my initial learning phase, finding solutions could be time-consuming. Some of the Stack Overflow solutions I found were based on previous versions of Socket.io. However, these resources still proved valuable as they pointed me in the right direction. I could adapt the solutions by referring to the migration sections in the Socket.io documentation to implement the required functionality.

## Improvements

-   **Using Frontend Application**: Implementing a frontend application can reduce the number of events that are being emitted. Callbacks can be used in certain situations when the event pertains to a specific socket only.

-   **Implementing Databases and Proper User Management**: Incorporating databases offers several advantages, including:

    -   User Registration, Login, and Authentication: Utilizing techniques like JSON Web Tokens (JWT) and other forms of authorization can enhance system security and user convenience.

    -   Data Persistence: Storing data permanently enables users to retain their chat histories, enhancing user experience.

    -   Reduced Event Handling: With a database, there's no need to handle events related to user information deletion. User information can be associated with their account, eliminating the need for manual data management.

## Basic Working of the Room

The Chat Room Application facilitates communication among users within different rooms. Here's how it works:

1. **User Registration**:

    - Users can join the server by providing a unique username.
    - If the username is invalid or already in use, an error event is emitted.

2. **Room Joining**:

    - Upon joining the server, users can see a list of pre-existing rooms and join them.
    - This allows users to engage in conversations within various rooms.

3. **Room Creation**:

    - Users have the ability to create new rooms, becoming the admin for those rooms.
    - When a room is created, the server is notified, and it initializes the room's data structures.

4. **Room Deletion**:

    - Only the admin of a room can delete it.
    - Deleting a room clears all associated data structures and forces all participants to leave the room.
    - An error event is emitted if a non-admin user attempts to delete a room.

5. **Leaving a Room**:

    - Users can leave a room at any time.
    - When they do, an event is emitted to inform other room members of their departure.

6. **Messaging**:

    - Users can send text messages and share images (encoded as base64 strings) within a room.
    - All room members can view and respond to these messages.

7. **Disconnect Handling**:
    - When a user disconnects, their data is removed from the server.
    - If they were part of a room, they are removed from that room and a departure message is emitted to the room.

## Data Structures

The Chat Room Application relies on several data structures to manage users, rooms, and messages:

-   **User Mapping**: A `Map` that associates usernames with socket IDs.
-   **Room Admins**: A `Map` that links room names to the usernames of their respective admins.
-   **Room Members**: An object where each key is a room name, and the value is an array of usernames for room members.
-   **Messages**: An object where each key is a room name, and the value is an array of messages, including sender and content.

## Events

### `connection`

This event is triggered when a client establishes a connection with the server. It marks the beginning of communication between the client and the server, allowing the client to interact with the chat room system.

### `join_server`

Checks if the provided username is valid and not already in use. If the username is invalid or already in use, emits an error event. If the username is valid and available, associates it with the client and sends a welcome message along with a list of available rooms.

### `create_room`

Checks if the room name is already in use. If the room name is already in use, emits an error event. If the room name is available, creates the room, adds the user as the admin, and notifies all clients of the new room's creation.

### `delete_room`

Checks if the user is the admin of the room they want to delete. If the user is not the admin, emits an error event. If the user is the admin, deletes the room, its data, and notifies all clients of the room's deletion.

### `join_room`

Checks if the room exists and if the user is not already a member. If the room does not exist or the user is already a member, emits an error event. If the room exists and the user is not a member, adds the user to the room and notifies all clients in the room of the new member.

### `leave_room`

Checks if the room exists and if the user is a member. If the room does not exist or the user is not a member, emits an error event. If the room exists and the user is a member, removes the user from the room and notifies all clients in the room of the departure.

### `send_message`

Checks if the room and user exist and if the user is a member of the room. If any conditions are not met, emits an error event. If conditions are met, sends the message to all clients in the room and adds it to the room's message history.

### `disconnecting`

Removes the user from all the rooms they joined. Sends a "room_left" message to each room the user was part of, notifying other room members of the departure.

### `disconnect`

Handles the socket disconnect event, triggered when a client fully disconnects.

## Emitted Events

### `server_joined`

Emitted after a client successfully joins the server. Includes a welcome message and a list of available rooms.

### `room_created`

Emitted when a user successfully creates a new room. Notifies all clients of the new room's creation.

### `room_deleted`

Emitted when the room admin successfully deletes a room. Notifies all clients of the room's deletion.

### `room_joined`

Emitted when a user successfully joins a room. Notifies all clients in the room of the new member's arrival.

### `room_left`

Emitted when a user successfully leaves a room. Notifies all clients in the room of the departure.

### `new_message`

Emitted when a user sends a message in a room. Sends the message to all clients in the room and adds it to the room's message history.

## Error Handling

### `error_status`

Emits an error event to a socket with details about the error.

## Postman Documentation

-   **URL**: `http://localhost:8080`

### Events to be Listened

1. `server_joined`: Emits when a client successfully joins the server.

2. `room_created`: Emits when a user successfully creates a new room.

3. `room_deleted`: Emits when the admin of a room successfully deletes it, removing all members.

4. `room_joined`: Emits when a user successfully joins a room.

5. `new_message`: Emits when a user sends a message in a room.

6. `error_status`: Emits when an error occurs.

7. `room_left`: Emits when a user successfully leaves a room.

8. `disconnecting`: Emits when a user is in the process of disconnecting.

9. `disconnect`: Emits when a client fully disconnects from the server.

### Events to be Emited

#### `join_server` => Allows a user to join the server with a unique username.

-   **Parameters**:
    -   `username` (string) - The unique username to be associated with the client.

#### `create_room` => Enables a user to create a new room and become its admin.

-   **Parameters**:
    -   `username` (string) - The username of the user creating the room.
    -   `roomName` (string) - The name of the room to be created.

#### `delete_room` => Allows the admin of a room to delete it, removing all members.

-   **Parameters**:
    -   `username` (string) - The username of the user making the request.
    -   `roomName` (string) - The name of the room to be deleted.

#### `join_room` => Allows a user to join an existing room.

-   **Parameters**:
    -   `username` (string) - The username of the user joining the room.
    -   `roomName` (string) - The name of the room to join.

#### `leave_room` => Allows a user to leave a room.

-   **Parameters**:
    -   `username` (string) - The username of the user leaving the room.
    -   `roomName` (string) - The name of the room to leave.

#### `send_message` => Allows a user to send a message in a room.

-   **Parameters**:
    -   `username` (string) - The username of the user sending the message.
    -   `roomName` (string) - The name of the room where the message is sent.
    -   `content` (string) - The content of the message. (Images in base64 string)

#### `disconnecting` => Handles the event when a user disconnects from the server.

#### `disconnect` => Handles the socket disconnect event, triggered when a client fully disconnects.
