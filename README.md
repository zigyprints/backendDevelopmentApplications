
# To-Do List

This repository is a part of assignment from @Zigy assigned as a backend project for Backend intern assesment process.
Following is an API list of all the necessary API,s.
The server is made with Express.JS and using MongoDB database.

## Getting Started

To run the To-Do List API locally, follow these steps:

1. get the repository from following github :

```bash
git clone https://github.com/Rishabhluv/backendDevelopmentApplications
```

2. Install the dependencies:

```bash
npm install
```
or
```bash
npm i
```

3. Change the directory and get into backend:
   
```bash
cd Backend
```

4. Start the server:

```bash
nodemon 
```

The server will be up and running at `http://localhost:3000`.


                                    OR


To use the already deployed server, you can use :
`https://todo-backend-app-1.onrender.com`.


## API Endpoints

The following API endpoints are available:

1. **GET `/api/readall`**: Retrieves all todos from the database.

2. **GET `/api/read/[:id]`**: Retrieves a single task by its _id from the database.

3. **POST `/api/create`**: Creates a new task and stores it in the database.
   - Request Body (JSON):
     ```json
     {
       "title": "Task 1",
       "description": "This is task 1 description"
     }
     ```

4. **PUT `/api/tasks/[:id]`**: Updates an existing todo in the database by its _id.
   - Request Body (JSON):
     ```json
     {
       "title": "Updated Task 1",
       "description": "Updated description",
     }
     ```

5. **DELETE `/api/delete/[:id]`**: Deletes a task from the database by its _id.

## Testing with Postman

To test the API endpoints using Postman:

1. Use Postman to make API requests to the specified endpoints.
2. For the POST and PUT requests, provide the required data in the request body as shown in the examples above.


## Note

This project is an assignment, and the provided code includes the necessary functions for handling CRUD operations on tasks in the to-do list using an MongoDB database .

For any issues or questions, feel free to contact me.

Happy task management with the To-Do List API!