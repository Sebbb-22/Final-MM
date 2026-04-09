import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await axios.get("http://localhost:3000/todos");
    setTodos(res.data.data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:3000/todos", {
      title: title,
      description: ""
    });

    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    loadTasks();
  };

  const toggleComplete = async (todo) => {
    await axios.put(`http://localhost:3000/todos/${todo.id}`, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed
  });

  loadTasks();
};



  return (
   <div className="container">

<h1 className="title">Todo App</h1>

<div className="inputBox">

<input
  value={title}
  onChange={(e)=>setTitle(e.target.value)}
  placeholder="Agregar nueva tarea..."
/>

<button className="addBtn" onClick={addTask}>
Agregar
</button>

</div>

{todos.map(todo => (

<div className="task" key={todo.id}>

<div className="task">

<input
type="checkbox"
checked={todo.completed}
onChange={()=>toggleComplete(todo)}
/>



<span className={todo.completed ? "completed" : ""}>
{todo.title}
</span>

</div>

<div className="buttons">

<Link to={`/task/${todo.id}`}>
<button className="view">Ver</button>
</Link>

<Link to={`/edit/${todo.id}`}>
<button className="edit">Editar</button>
</Link>

<button
className="delete"
onClick={()=>deleteTask(todo.id)}
>
Borrar
</button>

</div>

</div>

))}

</div>
  );
}

export default Home;