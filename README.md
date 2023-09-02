# To-Do List API

## Overview

This project is a simple To-Do List API built using Node.js, Express.js, TypeScript, and SQLite. It provides endpoints to manage tasks in a to-do list. The API allows users to create, retrieve, update, and delete tasks.

## Postman Collection Link 

https://drive.google.com/file/d/1x44Ze7DidQpMqW0Sga-CH_sKz0OhNny6/view?usp=sharing

## Features

- **Create a Task:** Users can create new tasks by sending a POST request to the `/api/tasks` endpoint.

- **Get All Tasks:** Users can retrieve a list of all tasks by sending a GET request to the `/api/tasks` endpoint.

- **Get a Specific Task:** Users can retrieve a specific task by sending a GET request to the `/api/tasks/:id` endpoint, where `:id` is the task's unique identifier.

- **Update a Task:** Users can update an existing task by sending a PUT request to the `/api/tasks/:id` endpoint.

- **Delete a Task:** Users can delete a task by sending a DELETE request to the `/api/tasks/:id` endpoint.

## API Endpoints

- **Create a task:** `POST /api/tasks`
- **Get all tasks:** `GET /api/tasks`
- **Get a specific task:** `GET /api/tasks/:id`
- **Update a task:** `PUT /api/tasks/:id`
- **Delete a task:** `DELETE /api/tasks/:id`

## Challenges Faced

While developing this To-Do List API, several challenges were encountered:

- **Database Management**: Configuring and managing the SQLite database and looking foe appropriate commands.

- **Error Handling**: Implementing robust error handling for various scenarios,like database-related errors etc.

## Future Improvements

As this project serves as a foundation for a To-Do List application, there are several areas for future enhancements:

- **User Authentication**: Implement user authentication and authorization mechanisms to secure user data and tasks.

- **Task Prioritization**: Add the ability to prioritize tasks, set due dates, and sort tasks based on different criteria.

- **Pagination**: Introduce pagination for listing tasks to improve performance and usability when dealing with large datasets.

- **Images and Videos**: Add the ability to also add photos and videos related to the task according to user requirements.

These improvements can help make the To-Do List application more robust, user-friendly, and suitable for real-world usage. 
