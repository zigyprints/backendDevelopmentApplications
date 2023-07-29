
# To-Do List Backend Application - CRUD API

This project is a backend application for a To-Do list application, built using the MVC (Model-View-Controller) architecture. It provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on tasks through Postman or any other API testing tool.

## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing tasks
- Mongoose: MongoDB object modeling for Node.js
- Postman: API testing tool

## Prerequisites

To run this application locally, you need to have the following installed on your system:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)
- Postman (https://www.postman.com)

## Getting Started

1. Clone the repository:

```
git clone https://github.com/Ishan-creed/backendDevelopmentApplications.git

```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

The server will start on port 5000 by default. You can change the port in the `config.js` file.

4. Make sure your MongoDB server is running. Update the database configuration in `config.js` if necessary.

## Endpoints

The API provides the following endpoints for task management:

### Create a new task

- **Endpoint**: `POST /addTask`
- **Request body**:
  ```
  {
    "taskId": 1/2/3...,
    "taskName": "Task title",
    "taskDescription": "Task description",
    "isCompleted":"false"
  }
  ```
- **Response**:
  ```
  {
    "_id": "taskId",
    "taskName": "taskName",
    "description": "taskDescription",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Retrieve all tasks

- **Endpoint**: `GET /getTasks`
- **Response**:
  ```
  [
    {
      "_id": "task_id",
      "title": "Task title",
      "description": "Task description",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    {
      "_id": "task_id2",
      "title": "Task title 2",
      "description": "Task description 2",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    ...
  ]
  ```

### Retrieve a specific task

- **Endpoint**: `GET /api/tasks/:id`
- **Response**:
  ```
  {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Update a task

- **Endpoint**: `PUT /api/tasks/:id`
- **Request body**:
  ```
  {
    "title": "Updated task title",
    "description": "Updated task description"
  }
  ```
- **Response**:
  ```
  {
    "_id": "task_id",
    "title": "Updated task title",
    "description": "Updated task description",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Delete a task

- **Endpoint**: `DELETE /api/tasks/:id`
- **Response**:
  ```
  {
    "message": "Task deleted successfully"
  }
  ```

## Using Postman

To interact with the API, import the provided Postman collection documenter file and use the pre-configured requests for each endpoint. The Postman collection file can be found here: [Link to Postman Collection Documenter](https://example.com)

## Additional Features and Improvements

Given more time, some additional features and improvements that could be added to the application are:

- User authentication and authorization for secure task management.
- Task priority and due date fields for better organization.
- Sorting and filtering options for tasks retrieval.
- Writing comprehensive unit and integration tests for better code quality.
- Validation of user to use apis.


