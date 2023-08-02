Technologies Used->

1.TypeScript
2.Node.Js
3.Express.Js
4.Sqlite
5.Github
6.Cors

Approach->
1.Npm initialized the project directory by running 'npm init-y'.
2.Made a proper file structure for efficient structuring and code-reusablity of the API.
3.Coded the app.ts to get the initial project up and running.
4.Declared the routes in the todoRoutes.ts folder. 
5.Implemented the Schema of the db Table in the src/models/todoModel.ts.
6.Made db.ts file to open a connection to the db.
7.Uploaded some sample data in the db from the uploadData.ts file from the root directory.
8.Implemented CRUD finctionality in the src/controller/todoController.ts file
9.Tested the API via postman bu running sample datas to ensure proper functionality.

Challenges Faced->
1.Implemented CRUD functionality gave a lot of BUGS which was slowly and eventuallu debugged.
2.Figuring out a proper and efficient way to add ID to the records.

Future Improvements->
1.Implementing Login/Logout feature is a must, which will allow multiple users to maintain their own ToDo lists.
2.Implementing date or calender features so that users can set a deadline to their tasks and be more productive.
3.Implementing a service like twillio in the API so that users can get notifications of the tasks that are incomplete and their deadlines are closing in.

Postman Documentation -> https://documenter.getpostman.com/view/25674746/2s9XxwvDm1