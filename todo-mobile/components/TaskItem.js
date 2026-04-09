import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskItem({task,navigation}){

return(

<View style={styles.task}>

<Text style={task.completed ? styles.completed : styles.text}>
{task.title}
</Text>

<View style={styles.buttons}>

<TouchableOpacity
onPress={()=>navigation.navigate("ViewTask",{id:task.id})}
>
<Text style={styles.button}>Ver</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>navigation.navigate("EditTask",{id:task.id})}
>
<Text style={styles.button}>Editar</Text>
</TouchableOpacity>

</View>

</View>

);

}

const styles = StyleSheet.create({

task:{
backgroundColor:"#f2f2f2",
padding:15,
marginBottom:10,
borderRadius:10
},

text:{
fontSize:16
},

completed:{
fontSize:16,
textDecorationLine:"line-through",
color:"gray"
},

buttons:{
flexDirection:"row",
marginTop:10,
gap:10
},

button:{
color:"blue"
}

});