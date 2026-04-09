import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import API from "../../services/api";

export default function EditTask() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    API.get("/todos/" + id).then((res) => {
      setTitle(res.data.data.title);
      setDescription(res.data.data.description);
      setCompleted(res.data.data.completed);
    });
  }, []);

  const updateTask = async () => {
    await API.put("/todos/" + id, {
      title,
      description,
      completed,
    });

    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar tarea</Text>

      <TextInput
        style={{ ...styles.input, fontWeight: "bold" }}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={updateTask}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f4f6f8",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    color: "purple",
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
