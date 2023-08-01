# TODO API

Tech stack - nodejs , expressjs , typescript and mongodb

##
Approach -  "MVC" (Model-View-Controller) pattern is used for organizing the code.In controller, i have created various controllers for both user authentication and 
for todos. Users controllers have login and signup for users. When users login a jwt token gets generated and sent to client. In Todos, There are controllers for 
adding , updating , deleting and getting user's todos . I have created a verifyToken middleware for user authentication so that users can only add, update, delete
and get only their todos. 

##
challanges faced - I didn't faced any challanges but i am not that much proficient in typescipt so typescript was a challange

## 
Additional features - assigning priorities to the todos , tagging todos as completed or not completed , adding deadline to the todos 

##
Collection Link :- https://drive.google.com/file/d/1rE4UZHjRAm-jbV41Rv6XNATQYwSYwTte/view?usp=sharing
