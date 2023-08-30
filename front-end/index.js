const APILINK = "http://localhost:3000/";
const main = document.getElementById("tasks");

returnTasks(APILINK);

function returnTasks(url){
    fetch(url)
    .then(res=>res.json())
    .then(function(data){
        console.log(data.tasks);
        data.tasks.forEach(task => {
            const div_task = document.createElement('div');
            div_task.innerHTML = `
                <div class="task" id="${task._id}">
                    <p>Task: ${task.task}</p>
                    <p>Completed: ${task.completed}</p>
                    <p><a href="#" onclick="editTask('${task._id}','${task.task}')">EDIT</a></p>                        
                    <p><a href="#" onclick="deleteTask('${task._id}')">DELETE</a></p>
                </div>
            `
            main.appendChild(div_task);
        });
    })
}

function editTask(id, d){
   const task = document.getElementById(id);
   const taskId = "task"+id
   const completedId = "completed"+id
   task.innerHTML = `
     <pid="${taskId}"><strong>Task  </strong> ${d}</p>
     <p><strong>Completed </strong><input type="checkbox" id="${completedId}"></p>
     <p><a href="#" onclick="saveTask('${taskId}', '${completedId}','${id}')">SAVE</a></p>
   `
}

function saveTask(tID, cID, id){
    // const task = document.getElementById(tID).value;
    const completed = document.getElementById(cID).checked;
    
    const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify({"completed": completed}), // Convert the data to JSON string
      };
      console.log(APILINK+'update/'+id);
      fetch(APILINK+'update/'+id, requestOptions)
      .then(res=>res.json())
      .then(res=>{
        location.reload();
      })
}