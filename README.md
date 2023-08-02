# To-Do List Backend Application - CRUD API

This repository contains a simple backend application for a To-Do list, offering CRUD (Create, Read, Update, Delete) operations on todos through a set of API endpoints. The project is structured following the MVC (Model-View-Controller) architecture and employs a technology stack including TypeScript, NodeJs, ExpressJs, MongoDB, Mongoose, and MongoDB Compass for database visualization.


## Technologies Used

- **TypeScript:** A Microsoft-developed language used for web and software development, often in conjunction with JavaScript.
- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A powerful web application framework for Node.js.
- **MongoDB:** A NoSQL database used for task storage.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **MongoDB Compass:** A graphical user interface for MongoDB to visualize and interact with the database.
- **Postman:** A versatile API testing tool.

## Prerequisites

Before running this application on your local system, ensure you have the following software installed:

- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Postman](https://www.postman.com)

## Getting Started

1. Clone the repository:

```
git clone https://github.com/Decoder-25/backendDevelopmentApplications.git

```

2. Install dependencies:

```
npm install
```

3. Configure **.env** file.:

```
PORT=<port number>
MONGO_URI = mongodb+srv://<your username>:<your password>@cluster0.gfw7syw.mongodb.net/<db_name>

For the reference you can use mine:

PORT=8000
MONGO_URI = mongodb+srv://Disha:QYmGLAhZ1G1JA1zm@cluster0.gfw7syw.mongodb.net/Todo_app
```

4. Start the server:

```
nodemon src/app.ts
```

## API Endpoints

The API provides the following endpoints for task management:

- **Create a Todo**: `POST /`
- **Get All Todos**: `GET /`
- **Get a Single Todo**: `GET /:id`
- **Update a Todo**: `PUT /:id`
- **Delete a Todo**: `DELETE /:id`

Relace **:id** with the mongoDB **ObjectId** for a particular todo.

## Using Postman

To interact with the API, you can use tools like Postman. The provided Postman collection includes pre-configured requests for each endpoint. Import the collection and start testing the API. 

[Postman Collection Documenter](https://documenter.getpostman.com/view/20379285/2s9XxvUvV1)

## Using MongoDB Compass

To see the database and the collections you can use MongoDB compass for better database visualization. Just put your **MONGO_URI** string and connect to the MongoDB database to see the collections and the changes made


```
mongodb+srv://<your username>:<your password>@cluster0.gfw7syw.mongodb.net/<db_name>
```

For the reference you can use mine to see my database:
```
mongodb+srv://Disha:QYmGLAhZ1G1JA1zm@cluster0.gfw7syw.mongodb.net/Todo_app
```


## Future Enhancements

Here are some potential enhancements for the application:

- User authentication and authorization for secure task management.
- Improved validation and error handling.
- Important todos and due date fields for better organization.


