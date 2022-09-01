import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import PetSelector from "../../Components/Pets/PetSelector";

export default function HomeScreen({ appUser }) {
  let testPets = [
    {
      name: "Claus",
      dob: "4/02/2018",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.startingText}>Begin by putting some stuff here</Text>
      <Text>The currently logged in user is: {appUser || "null"}</Text>

      <PetSelector appUser={appUser} pets={testPets} />
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