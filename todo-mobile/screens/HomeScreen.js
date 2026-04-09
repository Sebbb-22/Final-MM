import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TaskItem from "../components/TaskItem";
import API from "../services/api";

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/todos").then((res) => {
      setTasks(res.data.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
