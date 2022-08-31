import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import User from "../DataModels/UserDTO";

export default function HomeScreen({ appUser }) {
  return (
    <View style={styles.container}>
      <Text style={styles.startingText}>Begin by putting some stuff here</Text>
      <Text>The currently logged in user is: {appUser || "null"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },

  startingText: {
    marginTop: 50,
  },
});
