# TODO

This project is a backend application for managing TODO tasks using Node.js, Express.js, TypeScript, and MongoDB. The project's structure involves two main directories: `src` for TypeScript files and `dist` for JavaScript files compiled from TypeScript code.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB

## Project Structure

The project is divided into two main directories:

- `src`: Contains all the TypeScript files, including interfaces, models, and routes.
- `dist`: Contains the compiled JavaScript files generated from the TypeScript code in the `src` directory.

### Directory Breakdown

- `interfaces`: This directory holds TypeScript interface definitions used throughout the application.
- `models`: Here, you'll find MongoDB schema definitions written in TypeScript.
- `routes`: This directory contains APIs responsible for the CRUD operations related to TODO tasks.

## Challenges Faced

Two main challenges were encountered during the development of this project:

1. **TypeScript Integration with Mongoose**:setting types.

2. **TypeScript Deployment on Vercel**:configuring the vercel.json file.

## Backend Deployment

The backend application has been successfully deployed on Vercel. You can access the deployed backend using the following link:

[Backend Website Link](https://backend-development-applications-cui1.vercel.app/)

## How to Use

To set up and use the backend application, follow these steps:

1. Clone this repository to your local machine.
2. In the `src` directory, run `npm install` to install the required dependencies.
3. Configure your MongoDB connection settings in the appropriate configuration file.
4. Start the backend server locally with `npm start` or `npm run dev`.
5. Access the various API endpoints using tools like `curl` or Postman.

[Postman Workspace Link](https://www.postman.com/descent-module-cosmologist-42700976/workspace/todo)
