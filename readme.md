# Task Manager API

Welcome to the Task Manager API documentation. This API allows users to manage tasks, including creating, retrieving, updating, and deleting tasks.

Tech stack - nodejs , REST api, expressjs , typescript and mongodb 


## Introduction

The Task Manager API is designed to provide a straightforward way to manage tasks. It is built using the Express framework for handling HTTP requests and utilizes SQLite for the database.

## Endpoints

- `POST /api/`: Create a new task.
- `GET /api/`: Get a list of all tasks.
- `GET /api/:id`: Get details of a specific task.
- `DELETE /api/:id`: Delete a task.
- `PATCH /api/:id`: Update the status of a task.

## Getting Started

1. Clone this repository.
2. Install project dependencies using `npm install`.
3. Start the server with `npm start`.

## Usage

- To create a new task, send a `POST` request to `/api/` with the task details.
- To retrieve a list of all tasks, make a `GET` request to `/api/`.
- To get details of a specific task, send a `GET` request to `/api/:id`.
- To delete a task, use a `DELETE` request to `/api/:id`.
- To update a task's status, send a `PATCH` request to `/api/:id`.

## Challenges Faced

Developing this API involved overcoming various obstacles, such as handling asynchronous operations, dealing with errors, and validating data. I used async/await and a uniform error handling mechanism to address these issues. Moreover, learning TypeScript from scratch was a challenging but rewarding experience that enhanced my skills.


## API Documentation

For more detailed API documentation, you can refer to the following resources:

- [Postman Collection Documenter](https://documenter.getpostman.com/view/28167515/2s9Y5ctfx2)