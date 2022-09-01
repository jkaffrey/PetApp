import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PetInfoScreen({ appUser, route }) {
  const { pet } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.petName}>Pet Name: {pet.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
  },
  petName: {
    marginTop: 16,
    fontSize: 16,
  },
});
