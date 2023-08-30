
# ToDo App

A simple ToDo application to manage your tasks and stay organized.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman)
- [Challenges](#Hurdles)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The ToDo App is a web-based task management application that allows users to create, read, update, and delete tasks. With a user-friendly interface, it's designed to help users keep track of their tasks and manage their time effectively.

## Features

- Create tasks with a title and optional description.
- Mark tasks as completed.
- Update task details.
- Delete unnecessary tasks.
- Retrieve tasks by ID or view all tasks.
- RESTful API endpoints for seamless integration.

## Getting Started

Follow these instructions to set up the ToDo App on your local machine.

### Prerequisites

- Node.js (version 16.15.0)
- PostgreSQL (version 4.7.4)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/ravix007/backendDevelopmentApplications.git
   ```

2. Navigate to the project directory:

   ```bash
   cd backendDevelopmentApplications
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the PostgreSQL database:
   
   - Create a new PostgreSQL database.
   - Update the database configuration in `src/config.ts`.

5. Install database configurations:

   ```bash
   npm install pg
   ```

6. Start the application:
   ```bash
    npm install -g ts-node
    ```
   ```bash
    ts-node server.ts
   ```

The app should now be running at `http://localhost:3000`.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Use the web interface to create, update, and manage your tasks.

## API Endpoints

- `GET /tasks`: Get a list of all tasks.
- `GET /task/:id`: Get a task by ID.
- `POST /task`: Create a new task.
- `PUT /task/:id`: Update an existing task.
- `DELETE /task/:id`: Delete a task.

For detailed API documentation, refer to [API Documentation](API.md).

## Postman Collection
My postman collection link 

https://galactic-water-744516.postman.co/workspace/New-Team-Workspace~7d2e1b16-b666-4f92-9455-f93aee109a5b/collection/23530233-7541d1e9-2a39-4b50-9d86-6d2ed4b3b20f?action=share&creator=23530233

## Challenges
 1. I was facing issues while performing post request as I was getiing null contraint violated exception .So make sure to make your primary key  auto incrementing so that it keeps incrementing itself as you add a task

 2. I faced similar issues while performing put request as there was a difference of parameter names .In order to correct this you need to verify your request parameters and the database parameters .

## Contributing

Contributions are welcome! If you find any issues or have suggestions, feel free to open a GitHub issue and create pull requests.