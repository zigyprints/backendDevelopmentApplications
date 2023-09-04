## TODO Application Backend

In this project, we have built the backend for a TODO application. To structure the codebase, we organized it into three main folders: `Routes`, `Controllers`, and `Models`. Each of these components played a crucial role in creating a functional backend.

### Routes
The Routes folder helps us define the paths that the application should follow and determine what actions should be performed at each endpoint.

### Controllers
Controllers are responsible for handling the application's logic. They dictate what should happen when various HTTP requests are made to the server. While GET and POST requests were relatively straightforward to implement, I encountered some challenges with DELETE and PUT requests.

### DELETE Request
One of the trickier parts of the project was handling DELETE requests. I needed to identify the specific TODO item to delete. To accomplish this, I learned about private variables and applied this knowledge to extract the TODO item's unique identifier (ID). Once I successfully retrieved the ID, implementing the DELETE request became straightforward.

### PUT Request
With my newfound understanding of working with IDs, handling PUT requests, which involve updating TODO items, became much easier. I could identify the item to update and apply the necessary changes.

Overall, building the backend for this TODO application was a valuable learning experience for me. It allowed me to practice structuring code, handling different HTTP requests, and resolving challenges that arose during development.
