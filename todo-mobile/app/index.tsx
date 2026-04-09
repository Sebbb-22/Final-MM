import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as Progress from "react-native-progress";
import API from "../services/api";

type Task = {
  id: number | string;
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    API.get("/todos").then((res) => {
      setTasks(res.data.data);
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleComplete = async (task: Task) => {
    await API.put("/todos/" + task.id, {
      title: task.title,
      description: task.description,
      completed: !task.completed,
    });

    loadTasks();
  };

  const deleteTask = async (id: number | string) => {
    await API.delete("/todos/" + id);
    loadTasks();
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const progress = total === 0 ? 0 : completed / total;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>

      <View style={styles.stats}>
        <Progress.Circle
          size={80}
          progress={progress}
          showsText={true}
          borderWidth={0}
          color="purple"
          thickness={6}
        />

        <View style={{ marginLeft: 20 }}>
          <Text style={styles.statText}>Completadas: {completed}</Text>
          <Text style={styles.statText}>Restantes: {total - completed}</Text>
          <Text style={styles.statText}>Total: {total}</Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.task}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => toggleComplete(item)}
            >
              <Text style={{ color: "purple" }}>
                {item.completed ? "✔" : ""}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => router.push(`/view/${item.id}` as const)}
            >
              <Text style={item.completed ? styles.completed : styles.text}>
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push(`/edit/${item.id}` as const)}
            >
              <Text style={styles.edit}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/create" as const)}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "purple",
  },

  stats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  statText: {
    fontSize: 16,
  },

  task: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    color: "purple",
  },

  text: {
    fontSize: 16,
  },

  completed: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "purple",
  },

  edit: {
    fontSize: 18,
    marginHorizontal: 10,
  },

  delete: {
    fontSize: 18,
  },

  addButton: {
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: "purple",
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  addText: {
    color: "#fff",
    fontSize: 30,
  },
});
