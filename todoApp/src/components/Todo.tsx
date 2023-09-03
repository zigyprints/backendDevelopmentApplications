import  { useState, useEffect } from "react";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState<string[]>([]);

  const sendTodo = () => {
    if (todo.trim() !== "") {
      setTodoArray([...todoArray, todo]);
      setTodo("");
    }
  };
  const deleteTodo = (index: number) => {
    const updatedTodos = [...todoArray];
    updatedTodos.splice(index, 1);
    setTodoArray(updatedTodos);
  };

  useEffect(() => {
    console.log("Todos:", todoArray);
  }, [todoArray]);

  return (
    <>
      <h2>Todos</h2>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={sendTodo}>Add Todo</button>
      <div>
        {todoArray.map((todo, index) => (
          <div key={index}>
            <input type="checkbox" name="done" id="" />
            {todo}
            <input onClick={()=>deleteTodo(index)} type="button" name="delete" value="delete"/>
            </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
