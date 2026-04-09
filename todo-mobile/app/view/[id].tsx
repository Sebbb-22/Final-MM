import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import API from "../../services/api";

export default function ViewTask() {
  const { id } = useLocalSearchParams();

  const [task, setTask] = useState<{
    title: string;
    description: string;
    completed: boolean;
  } | null>(null);

  useEffect(() => {
    API.get("/todos/" + id).then((res) => {
      setTask(res.data.data);
    });
  }, []);

  if (!task) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>

        <Text style={styles.description}>{task.description}</Text>

        <Text
          style={[
            styles.completed,
            { color: task.completed ? "#32d32f" : "#d64b4b" },
          ]}
        >
          {task.completed ? "Tarea completada :)" : "Tarea pendiente :("}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f4f6f8",
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "purple",
  },

  description: {
    fontSize: 16,
    color: "#000",
    lineHeight: 22,
  },

  completed: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
