import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../pages.css";

function EditTask(){

  const {id} = useParams();
  const navigate = useNavigate();

 const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [completed, setCompleted] = useState(false);
  

  useEffect(()=>{
    axios.get(`http://localhost:3000/todos/${id}`)
      .then(res=>{
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
      });
  },[id]);

    const updateTask = async () => {

    try {

        await axios.put(`http://localhost:3000/todos/${id}`, {

        title: title,
        description: description,
        completed: completed

        });

        navigate("/");

    } catch (error) {

        console.error(error);

    }

    };

  return (

<div className="page-container">

<h2 className="page-title">Editar tarea</h2>

<div className="form-group">
<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>
</div>

<div className="form-group">
<textarea
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>
</div>

<button onClick={updateTask}>
Guardar cambios
</button>

</div>

);
}

export default EditTask;