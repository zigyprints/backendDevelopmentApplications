## Description:

This is a basic CRUD (Create, Read, Update, Delete) backend for a To-Do list application. It provides endpoints to create, retrieve, update, and delete To-Dos in the to-do list.

## Features:

A user can:
 - Create new To-Dos
 - Read information about existing To-Dos (name, description, status and creation date)
 - Update existing To-Dos i.e. mark them as done/undone, change their name and description
 - Delete existing To-Dos

## Tech Stack:
  - Node.js for the backend with Express framework
  - Used TypeScript for strict typing
  - MongoDB Atlas for database

## Usage:
### Prerequisties:

Make sure you have Node.js installed on your system.

## Steps:

Clone the repository using the following command in your git bash command line
```
git clone https://github.com/rigved-desai/backendDevelopmentApplications.git
```
Then install all necessary dependencies using the following command in your powershell/cmd:
```
npm install
```
And finally host the backend in your local machine using the following command in your powershell/cmd:
```
npm start
```

Now you can test the API using Postman with the base URL being the following:
```
http://localhost:8080/
```

## Documentation

The Swagger documentation for the API will be available at:
```
http://localhost:8080/docs
```

## My Approach:

My approach while building this simple API was to first lay down all the database schemas I will be using along with the necessary API endpoints using best practices before actually coding it up. The main challenge I faced while creating this was the usage of TypeScript and writing API documentation using Swagger as both of these things are quite new to me.

NOTE: I would add the .env file containing sensitive environment variables to the .gitignore file usually but in this case, since someone might need to run it in the localhost, I have pushed it to the repo.

## Future Improvements

I think the following things could be added to improve the user experience and make the app feature rich:
- User Authentication to enable multiple user support.
- Assigning priorities to To-Dos and sorting them acccordingly.
- Adding feature to auto delete To-Dos when completed.
