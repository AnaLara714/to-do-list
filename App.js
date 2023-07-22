import React, { useReact, useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, Container, Header } from "native-base";
import ToDoList from "./ToDoList";

const todosInitialState = {
  todos: [
    { id: 1, text: "finishing writing hooks chapter" },
    { id: 2, text: "play with kids" },
    { id: 3, text: "read bible" },
  ],
};

function todosreducer(state, action) {
  switch (action.type) {
    default:
      return todosInitialState;
  }
}

export const TodosContext = React.createContext();

export default function App() {
  const [state, dispacth] = useReducer(todosreducer, todosInitialState);

  return (
    <TodosContext.Provider value={{ state, dispacth }}>
      <ToDoList />
    </TodosContext.Provider>
  );
}
