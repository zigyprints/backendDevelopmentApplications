# Assignment: Simple Backend API Development with TypeScript
 

 ## Introduction
- Backend has been implemented using NestJS(A Backend framework for Node.js and Typescript applications) for handling HTTP requests and responses with strict typing.
- Database used is PostgreSQL and ElephantSQL(ElephantSQL is a PostgreSQL cloud hosting service provider.)
- API endpoints are RESTful and follow best practices in API design.
- Error cases are handled using HTTPExceptionFilters in Nest.js
- Postman documentation: https://documenter.getpostman.com/view/28414911/2s9Y5eNf5S

## Approach
- Set up a new NestJS project
- Install packages for NestJS to create API with PostgreSQL
- Update the app.module.ts file to configure the database as PostgreSQL
- Create instance database on https://www.elephantsql.com/ and copy DATABASE_URL
- Create entity - Create Todo entity in src/todolist/entities/todolist.entity.ts
- Create service - Implement CRUD operations for your Todo entity in the src/todolist/services/todolist/todolist.service.ts file.
- Create controller - Implement RESTful endpoints for your Todo list in the src/todolist/controllers/todolist/todolist.controller.ts file.
- Create DTO(Data Transfer Object) - Create DTO in src/todolist/dtos/todolist.dto.ts which helps in validation of input data
- Create interface - Create interface in src/todolist/interfaces/todolist/todolist.interface.ts.The role of this interface is to add static typing on variables or responses.
- Make sure project is running using `npm run start:dev`
- Use Postman to test API endpoints.
- Prepare Postman documentation.



## Challenges faced
- I had set the title,description and status as required fields but while checking PUT requests in Postman, I was unable to change only one of those fields at a time. So I had to make them optional in the data transfer object(DTO).
- I was having problem with eslint and prettier formatters and had to correct all the linting errors.
- Inputting the Date in UNIX timestamp format each time was troublesome so I had to set the default value to the current date and time.


## Additional Features
- Implement Logging using Logger in NestJS
- Allow user to enter date in YYYY-MM-DD format instead of UNIX timestamp.
- Allocate priority for the tasks(Low,Medium,High)
- Allocate categories for tasks(Eg. work,home)
- Authentication using JWT so that each user can login and access his or her personal todo lists.
- Sorting and filtering of tasks as per due date.
- Display tasks completed and tasks pending


## Installation

```bash
$ npm install
```
Go to https://www.elephantsql.com/ and create a free account and an instance database. copy the URL link of the database instance and paste it in a .env file with the variable name DATABASE_URL.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
