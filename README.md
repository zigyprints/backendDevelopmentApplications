# Chat-App 
This is a realtime chat app made using NodeJS, ExpressJS, Typescript, SocketIO in the Backend. The Frontend is made with vite and React , Shadcn is used for ui management and Tailwind css is used for designing.

## Implemented Features

- ***User Authentication***
- ***Chat Room Creation***
- ***Real-Time Text Messaging***

### WebSocket events - Used in Frontend

**addNewUser** - adds a new user to the list of Online Users. Which can be then fetched to mark user online or offline.

**disconnect** - a saftey feature to safely disconnect the socket connection.

**sendMessage** - to send messages to the recipient through socket io.

 #### Visit the ChatContext component to understand more about how socketIo is handled in the frontend  ####

## PostMan collection for understanding
Link - https://elements.getpostman.com/redirect?entityId=28051799-ca0e2bd7-ba57-4a4a-9ef4-3ee8328d1931&entityType=collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/28051799-ca0e2bd7-ba57-4a4a-9ef4-3ee8328d1931?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D28051799-ca0e2bd7-ba57-4a4a-9ef4-3ee8328d1931%26entityType%3Dcollection%26workspaceId%3D00a12ae7-60f9-45ac-a65e-ea06898bb932)

### PostMan collection documentation :-
https://documenter.getpostman.com/view/28051799/2s9YJdWhwv