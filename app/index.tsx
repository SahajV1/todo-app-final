import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function App() {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState<any[]>([]);

  const addTodo = () => {

    if (!text.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title: text,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleTodo = (id: string) => {

    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {

    setTodos(
      todos.filter(todo => todo.id !== id)
    );
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        🚀 My Todo App
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter todo..."
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={addTodo}
      >
        <Text style={styles.addText}>
          ADD TODO
        </Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.todoItem}>

            <TouchableOpacity
              onPress={() => toggleTodo(item.id)}
            >
              <Text style={[
                styles.todoText,
                item.completed && styles.completed
              ]}>
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.delete}>
                DELETE
              </Text>
            </TouchableOpacity>

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },

  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },

  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },

  addText: {
    color: 'white',
    fontWeight: 'bold'
  },

  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },

  todoText: {
    color: 'white',
    fontSize: 16
  },

  completed: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },

  delete: {
    color: 'red',
    fontWeight: 'bold'
  }

});
