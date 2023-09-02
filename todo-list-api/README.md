# Todo List API

## Overview

This repository contains the code for a simple To-Do List API built with Node.js, Express.js, TypeScript, and MongoDB. The API allows users to perform CRUD operations on their tasks.

## Features

- **Create Tasks:** Users can create tasks by sending a POST request to `/api/todo/tasks`.

- **List Tasks:** Users can retrieve a list of all tasks by sending a GET request to `/api/todo/tasks`.

- **Update Tasks:** Users can update a task by sending a PUT request to `/api/todo/tasks/:id`.

- **Delete Tasks:** Users can delete a task by sending a DELETE request to `/api/todo/tasks/:id`.

## Approach

- I used Express.js as the web framework for handling HTTP requests and responses.

- MongoDB is used as the database to store task data.

- Swagger documentation is implemented to provide detailed API documentation.

- Error handling is implemented to provide appropriate error responses with strict typing.

## Challenges Faced

- **Integration:** Integrating MongoDB and setting up the database connection was a challenge. However, it was resolved by following MongoDB's official documentation.

- **Swagger Implementation:** Initially, setting up Swagger documentation required some configuration, but it helped in creating detailed API documentation.

- **TypeScript Typing:** Ensuring strict typing throughout the project in TypeScript required some extra effort, but it enhances code quality.

## Additional Features & Improvements

Given more time, I would consider the following improvements and additional features:

- **Task Categories:** Allow users to categorize tasks into different categories or tags.

- **Due Dates:** Include a due date field for tasks and provide reminders.


## Getting Started

1. Clone the repository.

2. Install dependencies using `pnpm install`.

4. Start the server using ` npx ts-node src/app.ts`.

5. Access the API documentation at [http://localhost:8000/api-docs](http://localhost:8000/api-docs).

## API Documentation

- **Swagger Documentation:** [Link to Swagger Docs](./src/swagg/swagger.json)

