import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PetInfoScreen({ appUser, route }) {
  const { pet } = route.params;

  return (
    <View style={styles.container}>
      <Text>Pet Name: {pet.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
