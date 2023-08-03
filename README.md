
# To-Do List API

The To-Do List API is a backend application that allows users to manage tasks in a to-do list. It provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on tasks stored in an SQLite database.

## Getting Started

To run the To-Do List API locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/SAUMYXA/backendDevAppZigyprints.git
```

2. Install the dependencies:

```bash
npm install
```

3. Start the server:

```bash
npx nodemon --exec npx ts-node src/index.ts
```

The server will be up and running at `http://localhost:8001`.

## API Endpoints

The following API endpoints are available:

1. **GET `/api/tasks`**: Retrieves all tasks from the database.

2. **GET `/api/tasks/:id`**: Retrieves a single task by its ID from the database.

3. **POST `/api/tasks`**: Creates a new task and stores it in the database.
   - Request Body (JSON):
     ```json
     {
       "title": "Task 1",
       "description": "This is task 1 description"
     }
     ```

4. **PUT `/api/tasks/:id`**: Updates an existing task in the database by its ID.
   - Request Body (JSON):
     ```json
     {
       "title": "Updated Task 1",
       "description": "Updated description",
       "completed": true
     }
     ```

5. **DELETE `/api/tasks/:id`**: Deletes a task from the database by its ID.

## Testing with Postman

To test the API endpoints using Postman:

1. Use Postman to make API requests to the specified endpoints.
2. For the POST and PUT requests, provide the required data in the request body as shown in the examples above.

## Database

The tasks data is stored in an SQLite database file named `database.sqlite`. The database is automatically created and initialized when the server starts. It also includes a `tasks` table with the following schema:

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  completed BOOLEAN NOT NULL
);
```

## Note

This project is an assignment, and the provided code includes the necessary functions for handling CRUD operations on tasks in the to-do list using an SQLite database.

For any issues or questions, feel free to contact me.

Happy task management with the To-Do List API!
