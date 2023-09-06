**APPROACH TO SOLUTION**

1. Spinned up a simple Express server. 
2. Used SQLite library to handle database management. 
3. Created a server.js file to delegate database initialization. 
4. Used a separate file for routes to handle all CRUD operations on /todos route. 

POSTMAN Documentation for the API -
https://documenter.getpostman.com/view/11144274/2s9YBxZbXq

**CHALLENGES FACED**

1. Since this is my second or third time working with TypeScript, I did have some problems getting used to the strict typing and different style of exporting and importing modules.
2. Writing POSTMAN documentation was something new to me, but a helpful guide was able to guide me through all steps with relative ease. 

**FEATURES I WOULD HAVE ADDED IF THERE WAS MORE TIME**

1. Would have worked on request query management to efficiently handle chunks of large data (For example: /todos?limit=50 which would generate less responses, etc.) 
2. Worked on some form of basic authentication to help protect the routes from unauthorized access. 
3. Would have split the code into better chunks to make the code prettier. 


**STEPS TO SETUP THE PROJECT**

- Use `npm install` to install all required dependencies.
- Once done, use `npm start` on the terminal to compile TS and run the project. 


