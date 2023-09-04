import axios from 'axios';

export const getTodos = () => {
    const response = axios.get("http://localhost:3000/todos") // Add "http://" here
        .then((response) => {
            console.log(response, "response from api");
            return response;
        })
        .catch((error) => {
            console.error("Error fetching todos:", error);
            throw error; // You may choose to handle the error differently
        });

    return response;
}

export const deleteTodos = (id) => {
    const url = `http://localhost:3000/todos/${id}`;
    const response = axios
      .delete(url) 
      .then((response) => {
        console.log(response, "response from API");
        return response;
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        throw error;
      });
  
    return response;
  };

  export const createTodo = (todoData) => {
    const url = 'http://localhost:3000/todos';
  
    const response = axios
      .post(url, todoData) // Send the todo data in the request body
      .then((response) => {
        console.log(response.data, "response from API");
        return response.data; // Return the response data (e.g., the created todo)
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
        throw error;
      });
  
    return response;
  };

  export const updateTodo = (id , data) => {
    const url = `http://localhost:3000/todos/${id}`;
    const response = axios
      .put(url ,data) 
      .then((response) => {
        console.log(response, "response from API");
        return response;
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        throw error;
      });
  
    return response;
  };

  
