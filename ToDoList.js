import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  Item,
  Text,
} from "native-base";
import { TodosContext } from "./App";
import { TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StyleSheet } from "react-native";
import uuid from "uuid-random";

export default function ToDoList() {
  const { state, dispacth } = useContext(TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? "Edit" : "Add";

  const renderItem = (data) => (
    <View style={styles.rowFront}>
      <Text>{data.item.text}</Text>
    </View>
  );
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => editRow(data.item, rowMap)}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteRow(data.item)}
        style={styles.backRightBtn}
      >
        <Text style={{ color: "#FFF" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  const deleteRow = (todo) => {
    dispacth({ type: "delete", payload: todo });
  };
  const editRow = (todo, rowMap) => {
    setTodoText(todo.text);
    setEditMode(true);
    setEditTodo(todo);
    if (rowMap[todo.id]) {
      rowMap[todo.id].closeRow();
    }
  };
  const handleSubmit = () => {
    if (editMode) {
      dispacth({ type: "edit", payload: { ...editTodo, text: todoText } });
      setEditMode(false);
      setEditTodo(null);
    } else {
      const newToDo = { id: uuid(), text: todoText };
      dispacth({ type: "add", payload: newToDo });
    }
    setTodoText("");
  };

  return (
    <Container>
      <Header searchBar>
        <Item>
          <Input
            placeholder="Enter ToDo"
            onChangeText={(text) => setTodoText(text)}
            value={todoText}
          />
          <Button transparent onPress={handleSubmit}>
            <Text>{buttonTitle}</Text>
          </Button>
        </Item>
      </Header>
      <SwipeListView
        data={state.todos}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  rowFront: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomWidth: 0.25,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    backgroundColor: "red",
    right: 0,
  },
});
