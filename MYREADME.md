

API endpoints for todolist crud operations:

endpoint name : http://localhost:8000/todoapi/createtodo and the request method is 'POST'
data to be sent in the bellow manner
body to be passed as
{
    "todo":"todo_name",
    "description:"todo_description"
}

endpoint name : http://localhost:8000/todoapi/updatetodo and the request method is 'PUT'
data to be sent in the bellow manner
body to be passed as
{
    "id":"_id" //this is from database the object id that you want to update
    "updatedTodo":"updatedTodo_name",
    "updatedDesc:"updatedDesc_description"
}

endpoint name : http://localhost:8000/todoapi/gettodo and the request method is 'GET'
all the data from specified collection is fetched with this endpoint


endpoint name : http://localhost:8000/todoapi/deletetodo and the request method is 'DELETE'
data to be sent in the bellow manner
body to be passed as
{
    "id":"_id" //this is from database the object id that you want to delete
}

I used object id for updation and deletion for user security
error handling can be handled by the try catch blocks as it is not a complex backend api

Collection Link : https://documenter.getpostman.com/view/29493694/2s9Y5cugPj