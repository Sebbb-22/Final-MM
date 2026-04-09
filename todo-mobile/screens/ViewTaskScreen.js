import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import API from "../services/api";

export default function ViewTaskScreen({route}){

const {id} = route.params;
const [task,setTask] = useState(null);

useEffect(()=>{

API.get("/todos/"+id)
.then(res=>{
setTask(res.data.data);
})

},[]);

if(!task) return null;

return(

<View style={{padding:20}}>

<Text>Titulo: {task.title}</Text>
<Text>Descripcion: {task.description}</Text>
<Text>Estado: {task.completed ? "Completada" : "Pendiente"}</Text>

</View>

);

}