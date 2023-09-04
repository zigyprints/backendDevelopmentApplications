document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Fetch tasks from the backend
    async function fetchTasks() {
        const response = await fetch('http://localhost:3000/api/tasks');
        const tasks = await response.json();

        taskList.innerHTML = ''; // Clear the existing list

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.title}
                <button class="delete" data-id="${task.id}">Delete</button>
                <button class="update" data-id="${task.id}">Update</button>
            `;

            // Add event listeners for delete and update buttons
            const deleteButton = li.querySelector('.delete');
            deleteButton.addEventListener('click', deleteTask);

            const updateButton = li.querySelector('.update');
            updateButton.addEventListener('click', updateTask);

            taskList.appendChild(li);
        });
    }

    // Handle task submission
    taskForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = taskInput.value;

        if (!title) {
            alert('Please enter a task.');
            return;
        }

        // Send a POST request to create a new task
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        if (response.ok) {
            taskInput.value = ''; // Clear the input field
            fetchTasks(); // Refresh the task list
        } else {
            alert('Failed to create a task.');
        }
    });

    // Handle task deletion
    async function deleteTask(e) {
        const taskId = e.target.getAttribute('data-id');

        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchTasks(); // Refresh the task list
        } else {
            alert('Failed to delete the task.');
        }
    }

    // Handle task update
    async function updateTask(e) {
        const taskId = e.target.getAttribute('data-id');
        const title = prompt('Update the task:', '');

        if (title === null) {
            return; // User canceled the update
        }

        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        if (response.ok) {
            fetchTasks(); // Refresh the task list
        } else {
            alert('Failed to update the task.');
        }
    }

    // Initial fetch to populate the task list
    fetchTasks();
});
