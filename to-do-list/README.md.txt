Link to Postman collection: https://api.postman.com/collections/29494467-fc378dfc-3472-48b1-8f65-49eefb93d375?access_key=PMAT-01H9D8ZBSNTASXZ77HFYZ0564D

I created a RESTful API using NodeJS, Express, and TypeScript.

Tech-Stack used: NodeJS, Express, Typescript, SQLite3.

Approach:

Divided the API into 2 parts routes (routes.ts) and functions (functions.ts). Based on the request made, the routes part handled routing and made the function calls necessary to handle the request.

Implemented CRUD operations for tasks.

'knex' was used as a tool to execute SQL statements against the database.

Future Scope:

(If given time) An alarm system: a system that notifies the user when the deadline of a task is near.

(If given time) Tasks sorted by dates.

(If given way more time) An AI system that stores the tasks created by the user in a cache system (With the necessary permissions from the user of course) and then that data can be used to show ads to the user.