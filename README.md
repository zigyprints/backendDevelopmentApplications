I have included a basic front-end which will make testing easier....

My approach:
1. Each task in the list has 2 values: Task(string) and completed(boolean). The completed is set to false by default.

2. I used MongoDB as the light weight database to store the tasks. Each request/operation to database is performed using "Mongoose".

3. First, all tasks in the database are shown.

4. If you finished a task, click on "edit" and check the checkbox next to "completed". Next, click "save" to update the "completed" to true.

5. Delete a task by clicking on delete.

6. I've used middlewares to handle errors.

7. you can also filter the tasks based on whether they are "completed" or not. This will show only the tasks with the specified completion status.


Challenges:
1. I only know the basics of TypeScript because I used it to create another simple web app which uses NestJS for the backend. This was an assessment 
    which was part of the hiring process of another start-up. I had to learn TypeScript again for NodeJS as I had only used it for that specific assignment, and I'm used to writing in JavaScript for NodeJS. This was a little time consuming.



Additional features I could've added with more time:
1. Intuitive search function which can search through all the tasks and return the tasks matching the keywords.

2. User Authentication and Authorization.

3. I also thought of seperating the tasks based on categories.



Misc:
1. I have also include the Postman collection json file in Github called "task-manager.postman_collection".

2. The front-end doesn't include the filter option. This is also another feature I could've incorporated if I had more time.