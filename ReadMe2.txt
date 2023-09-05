
# To-Do API

This is a simple To-Do API that allows you to perform CRUD (Create, Read, Update, Delete) operations on tasks. It utilizes both MongoDB and SQLite3 databases for storage. You can use this API to manage your to-do list efficiently.

## Features

- Create tasks with details such as Title, Description, Status, and Due Date.
- Retrieve tasks from both MongoDB and SQLite3 databases.
- Update tasks with ease by providing the required details.
- Delete tasks from both databases to keep your list organized.

## Getting Started

Follow these steps to set up and use the To-Do API on your local machine:

### Prerequisites

1. Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/theavitw/backendDevelopmentApplications.git
   ```

2. Navigate to the project directory:

   ```bash
   cd to-do-api
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Configure the environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables:

     ```dotenv
     MONGODB_URI=<your-mongodb-uri>
     SQLITE3_DB_PATH=<path-to-sqlite3-database>
     ```

     Replace `<your-mongodb-uri>` with your MongoDB connection URI, and `<path-to-sqlite3-database>` with the path to your SQLite3 database file.

### Usage

1. Start the API server:

   ```bash
   npm start
   ```

   The API will be accessible at `http://localhost:3000/api/`.

2. Use a tool like Postman or cURL to interact with the API by sending HTTP requests to the provided endpoints.

### API Endpoints

- `GET /tasks`: Retrieve all tasks from both MongoDB and SQLite3 databases.
- `GET /tasks/:id`: Retrieve a task by ID from both databases.
- `POST /tasks`: Create a new task in both databases. Include the task details in the request body.
- `PUT /tasks/:id`: Update a task by ID in both databases. Include the updated task details in the request body.
- `DELETE /tasks/:id`: Delete a task by ID from both databases.

### Sample Request

Here's a sample request to create a new task using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "title": "Complete Assignment",
  "description": "Finish the To-Do API assignment",
  "status": "In Progress",
  "dueDate": "2023-09-30"
}' http://localhost:3000/api/
```

### Additional Notes

- This API allows you to perform CRUD operations on tasks in both MongoDB and SQLite3 databases simultaneously.
- Make sure to configure the environment variables with your database connections.

## Troubleshooting and Learnings

While developing this To-Do API, I faced a few challenges and learned valuable lessons:

- **Database Integration**: Integrating two different databases (MongoDB and SQLite3) required careful design and management of data models.

- **Concurrent Updates**: Handling concurrent updates to two databases without data inconsistencies was a challenge. I used transactional operations in SQLite3 to address this.

- **Environment Configuration**: Managing environment variables for database connections was crucial for flexibility and security.

- **Error Handling**: Implementing robust error handling and providing meaningful error messages improved the API's usability.

Feel free to explore and further enhance this To-Do API for your needs! If you have any questions or need assistance, please don't hesitate to reach out.

Happy coding!
