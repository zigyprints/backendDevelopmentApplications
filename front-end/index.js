
const APILINK = "http://localhost:3000/api/v1/tasks";
const main = document.getElementById("tasks");
const create = document.getElementById("create");
const newTask = document.getElementById("newTask");
// create.innerText = "Create Task";
// const complete = document.getElementById("complete");
// const incomplete = document.getElementById("incomplete");

// console.log(complete, incomplete);

returnTasks(APILINK);

function createTask(){
  const new_div = document.createElement('div');
  const uniqueId = Date.now();
  new_div.setAttribute("id", "new_div")
  new_div.innerHTML = `
    <input id="t_${uniqueId}" type="text" placeholder="enter task..."><br/>
    <a href="#" onclick="addTask('t_${uniqueId}')">save</a>
  `
  newTask.appendChild(new_div);
}

function addTask(task_id){
  const task = document.getElementById(task_id).value;
  const requestOptions = {
    method:"POST",
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({"task": task})
  }
  fetch(APILINK, requestOptions)
  .then(res=>res.json())
  .then(res=>{
    if (res.error) 
      alert(res.error);
    else{
    console.log(res);
    location.reload();
  }
  })
  .catch(error=>{
    throw error;
  })
}

function returnTasks(url){
    fetch(url)
    .then(res=>res.json())
    .then(function(data){
        console.log(data.tasks);
         
        create.onclick = createTask;
        // create.innerHTML = `
        //   <a href="" onclick="createTask()"></a>
        // `
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

function deleteTask(id){
  const requestOptions = {
    method:'DELETE',
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({_id: id})
  }
  fetch(APILINK, requestOptions)
  .then(res=> res.json())
  .then(res=>{
    location.reload();
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