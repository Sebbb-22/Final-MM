import { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import API from "../services/api";

export default function EditTaskScreen({route,navigation}){

const {id} = route.params;

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");

useEffect(()=>{

API.get("/todos/"+id)
.then(res=>{
setTitle(res.data.data.title);
setDescription(res.data.data.description);
})

},[]);

const updateTask = async()=>{

await API.put("/todos/"+id,{
title,
description
});

navigation.navigate("Home");

};

return(

<View style={{padding:20}}>

<TextInput
value={title}
onChangeText={setTitle}
/>

<TextInput
value={description}
onChangeText={setDescription}
/>

<Button
title="Guardar"
onPress={updateTask}
/>

</View>

);

}