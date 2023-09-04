import { useState, useEffect } from "react";
import {
  getTodos,
  deleteTodos,
  createTodo,
  updateTodo
} from "../apicall/Api";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState<TodoItem[]>([]);

  interface TodoItem {
    id: number;
    description: string;
    completed: boolean;
  }

  const fetchTodos = async () => {
    const response = await getTodos();
    const todosFromAPI = response.data.map((todo: any) => ({
      id: todo._id,
      description: todo.description,
      completed: todo.completed
    }));
    setTodoArray(todosFromAPI);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const sendTodo = async () => {
    if (todo.trim() !== "") {
      const newTodo = {
        description: todo,
        completed: false
      };
      const response = await createTodo(newTodo);
      console.log(response);
      fetchTodos();
    }
  };

  const deleteTodo = async (id: number) => {
    console.log(id, "todo id");
    const response = await deleteTodos(id);
    console.log(response);
    fetchTodos();
  };

  const toggleTodoCompletion = async (id: number) => {
    const todoToUpdate = todoArray.find((todo) => todo.id === id);
    if (todoToUpdate) {
      todoToUpdate.completed = !todoToUpdate.completed;
      const response = await updateTodo(id, {
        completed: todoToUpdate.completed
      });
      console.log(response);
      fetchTodos();
    }
  };

  useEffect(() => {
    console.log("Todos:", todoArray);
  }, [todoArray]);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <div>
        <h2 className="text-2xl font-semibold text-start mb-12">Todos</h2>
        <input
          className="p-2 mr-12 bg-black border-slate-500 border rounded-md"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          onClick={sendTodo}
          className="p-2 border border-slate-500 rounded-md"
        >
          Add Todo
        </button>
      </div>
      <hr className="w-full bg-slate-300 my-4" />
      {todoArray.map((todo) => (
        <div className="mt-2" key={todo.id}>
          <input
            type="checkbox"
            name="done"
            id=""
            checked={todo.completed}
            onChange={() => toggleTodoCompletion(todo.id)}
          />
          <span
            className={`p-2 text-2xl ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.description}
          </span>
          <button
            className="p-2 border border-slate-500 rounded-md"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
