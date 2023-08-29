# To Do List

A to-do list is a simple yet powerful tool that helps individuals or groups organize their tasks and responsibilities. It serves as a central place to jot down tasks, assignments, and projects that need to be completed. Users can add items to the list, set priorities, and mark tasks as done when they are completed

### Approach 
## API Endpoints

1. **GET /tasks**
   - Retrieves a list of all tasks from the database.
   - Returns a JSON array of tasks.

2. **POST /tasks**
   - Creates a new task and adds it to the database.
   - Expects a JSON object in the request body with the task details.
   - Returns the newly created task as a JSON object.

3. **PUT /tasks/:id**
   - Updates an existing task based on its ID.
   - Expects a JSON object in the request body with the updated task details.
   - Returns the updated task as a JSON object.

4. **DELETE /tasks/:id**
   - Deletes a task based on its ID.
   - Returns a success message upon successful deletion.

## Data Models

Tasks in the application are represented using the following TypeScript interface:

```typescript
interface Task {
    _id: string;      // Unique ID assigned by MongoDB
    title: string;    // Task title
    completed: boolean;   // Whether the task is completed
}
```

### Challenge Faced

The primary challenge I encountered during the development process was related to a specific configuration in my Express.js application. Specifically, I forgot to include a forward slash ('/') before specifying the route path when using the `app.use` method to link a router.


### Additional Features

# 1. Time Range Selection Feature

The Time Range Selection feature provides users with the flexibility to specify a designated time range for completing a particular task. With this enhancement, users can allocate tasks to specific time slots throughout the day, ensuring optimal planning and time management.

**Benefits:**
- Improved organization: Users can allocate tasks to their preferred time slots, optimizing their daily schedules.
- Enhanced productivity: Task completion is aligned with users' peak efficiency periods, leading to more productive outcomes.

# 2. Reminder Functionality

The Reminder feature adds an extra layer of efficiency by sending timely reminders to users for tasks scheduled at specific times. This functionality ensures that users stay organized and on top of their tasks, minimizing the chances of missing important activities.

**Benefits:**
- Improved task adherence: Reminders help users stay accountable for their scheduled tasks.
- Reduced forgetfulness: Users are less likely to overlook tasks when timely reminders are in place.

# 3. Graphical/Statistical Data Presentation

Enhancing the user experience, this feature provides users with insightful graphical and statistical data related to task completion. Visualizations and charts showcase the completion rate of tasks scheduled at different times throughout the day. Additionally, users gain valuable insights into their task completion patterns for daily schedules.

**Benefits:**
- Data-driven decision-making: Users can adjust their task scheduling based on performance trends and patterns.
- Motivation: Visual representations of task completion progress can motivate users to maintain consistent scheduling habits.
