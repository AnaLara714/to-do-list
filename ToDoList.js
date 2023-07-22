import React, { useContext } from "react";
import { Container, Header, Text } from "native-base";
import { TodosContext } from "./App";
import { View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { StyleSheet } from "react-native";

export default function ToDoList() {
  const { state, dispacth } = useContext(TodosContext);
  const renderItem = (data) => (
    <View style={styles.rowFront}>
      <Text>{data.item.text}</Text>
    </View>
  );

  return (
    <Container>
      <Header style={{ backgroundColor: "skyblue" }}>
        <Text
          style={{
            alignSelf: "center",
            top: 15,
            justifyContent: "center",
            height: 50,
          }}
        >
          ToDoList
        </Text>
      </Header>
      <SwipeListView data={state.todos} renderItem={renderItem} />
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
});
