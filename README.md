## Simple Backend API Development with TypeScript

### Prerequisites
- Make sure you have Node.js and npm installed. You can download it from [nodejs.org](https://nodejs.org/).
- No running database server needed because we are using SQLite (self-contained, serverless, and zero-configuration database engine)

### Approach

- Server and database setup
- the creation of a Task model
- Maintaining folder structure for better maintenance
- creating routes with proper error handling

### Features

- Create todos with details such as Name, Description, Completed boolean value.
- Retrieve todos from the SQLite3 databases.
- Update todos with ease by providing the ID.
- Delete todos with ease by providing the ID.

### Challenges

- first time using TypeScript so Strict Typing was something new to me
- first time using SQLite also, again a new experience

### Installation and Setup

Follow these steps to set up and use the To-Do API on your local machine:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/tanmayjajo/backendDevelopmentApplications.git
   ```

2. Navigate to the project directory:

   ```bash
   cd backendDevelopmentApplications
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Configure the environment variables:
   - Create a `.env` file in the root directory.
   - See `.env.example` to get an idea of how to write the `.env` file


### Usage
1. Start the backend server:

   ```bash
   npm run start
   ```
   
   The API will be accessible at `http://localhost:3001/api/`.

2. Use a tool like Postman to interact with the API by sending HTTP requests to the provided endpoints.
3. Or use the Postman Collection Link Provided to Test All APIs at Once.

### Postman Documentation Link
[Postman Collection](link.com)

### API Endpoints

- `GET /todos`: Retrieve all todos from SQLite3 database.
- `GET /todos/:id`: Retrieve a todo by ID from the database.
- `POST /todos`: Create a new todo in the database. Include the todo details in the request body.
- `PUT /todos/:id`: Update a todo by ID in the database. Include the updated todo details in the request body.
- `DELETE /todos/:id`: Delete a todo by ID from the database.
