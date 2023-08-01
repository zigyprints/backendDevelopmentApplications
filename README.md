Todo Application API - Endpoints Documentation

Overview

This document provides detailed information about the API endpoints for a Todo Application. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks.

API Endpoints

1.Create a task

POST /tasks/create

2.Get all tasks

GET /tasks/get

3.Get task by ID

GET /tasks/get/:id

4.Update task by ID

PATCH /tasks/update/:id

5.Delete task by ID

DELETE /tasks/delete/:id

Postman API Documentation

The postman API dcoumentation link is : https://documenter.getpostman.com/view/28873754/2s9XxvRtzo

Challenges Faced

The usage of Typescript requires practise and there are many ways to handle async function error, which I had to struggle a bit. IT was overall a easy task since there was no authentication or
authorization that needed to be added.

Improvements

The API endpoints could have been secured by adding in the authentication best practises of using JWT Tokens.
