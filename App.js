import React, { useReact, useReducer } from "react";
import ToDoList from "./ToDoList";
import { Header, Text } from "native-base";

const todosInitialState = {
  todos: [
    { id: 1, text: "finishing writing hooks chapter" },
    { id: 2, text: "play with kids" },
    { id: 3, text: "read bible" },
  ],
};

function todosreducer(state, action) {
  switch (action.type) {
    case "add":
      const addedToDos = [...state.todos, action.payload];
      return { ...state, todos: addedToDos };
    case "edit":
      const updateToDo = { ...action.payload };
      const updateToDoIndex = state.todos.findIndex(
        (t) => t.id === action.payload.id
      );
      const updateToDos = [
        ...state.todos.slice(0, updateToDoIndex),
        updateToDo,
        ...state.todos.slice(updateToDoIndex + 1),
      ];
      return { ...state, todos: updateToDos };
    case "delete":
      const filteredTodoState = state.todos.filter(
        (todo) => todo.id != action.payload.id
      );
      return { ...state, todos: filteredTodoState };
    default:
      return todosInitialState;
  }
}

export const TodosContext = React.createContext();

export default function App() {
  const [state, dispacth] = useReducer(todosreducer, todosInitialState);

  return (
    <TodosContext.Provider value={{ state, dispacth }}>
      <Header>
        <Text
          style={{
            alignSelf: "center",
            top: 15,
            justifyContent: "center",
            height: 50,
            color: "white",
          }}
        >
          ToDoList
        </Text>
      </Header>
      <ToDoList />
    </TodosContext.Provider>
  );
}
