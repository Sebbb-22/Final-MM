
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../pages.css";

function ViewTask(){

  const {id} = useParams();
  const [task,setTask] = useState(null);

  useEffect(()=>{
    axios.get(`http://localhost:3000/todos/${id}`)
      .then(res=> setTask(res.data.data));
  },[id]);

  if(!task) return <p>Cargando...</p>;

  return (

<div className="page-container" style={{backgroundColor:"#fff"}}>

<h2 className="page-title">Detalle de tarea</h2>

<div className="task-info">
<span className="task-label">Título:</span>
<p>{task.title}</p>
</div>

<div className="task-info">
<span className="task-label">Descripción:</span>
<p>{task.description}</p>
</div>

<div className="task-info">
<span className="task-label">Estado:</span>
<p>{task.completed ? "¡Completada!" : "Pendiente..."}</p>
</div>

</div>

);
}

export default ViewTask;