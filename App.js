import React, { useReact, useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, Container, Header } from "native-base";

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return initialState;
  }
}

export default function App() {
  const [state, dispacth] = useReducer(reducer, initialState);

  return (
    <Container>
      <Header>
        <Text>Count: {state.count}</Text>
      </Header>
      <Button onPress={() => dispacth({ type: "increment" })}>
        <Text>Increment</Text>
      </Button>
      <Button success onPress={() => dispacth({ type: "decrement" })}>
        <Text>Decrement</Text>
      </Button>
      <Button warning onPress={() => dispacth({ type: "reset" })}>
        <Text>Reset</Text>
      </Button>
    </Container>
  );
}
