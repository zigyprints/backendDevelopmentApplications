const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionInput");
const taskList = document.getElementById("taskList");

const updateTaskList = async () => {
    taskList.innerHTML = "";
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="task-item">
        <span class="task-title">${task.title}</span>
        <span class="task-description">${task.description || ""}</span>
        <div class="task-buttons">     
            <button class="complete-button" onclick="completeTask(${task.id}, ${task.completed}, '${task.title}', '${task.description}')">
            ${task.completed ? "Undo": "Complete"}
            </button>
            <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
        </div>
        </div>
    `;
    li.className = task.completed ? "completed" : "";
    taskList.appendChild(li);
    });
};

const completeTask = async (id, completed, title, description) => {
    const updatedTask = {
        id,
        completed: !completed,
        title,
        description,
    };

    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
            });
            if (response.ok) {
                updateTaskList();
            } else {
                console.error("Failed to complete task:", response.status, response.statusText);
            }
    } catch (error) {
        console.error("Error while completing task:", error);
    }
};

const deleteTask = async (id) => {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (response.ok) {
    updateTaskList();
    }
};

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!title) return;

    const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
    titleInput.value = "";
    descriptionInput.value = "";
    updateTaskList();
    }
});

document.addEventListener("DOMContentLoaded", updateTaskList);