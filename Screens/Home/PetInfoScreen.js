import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PetInfoButton from "../../Components/Pets/PetInfoButton";

export default function PetInfoScreen({ appUser, route }) {
  const { pet } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.petIcons}>
        <PetInfoButton label={"General Information"} iconName={"information"} />
        <PetInfoButton label={"Veterinarian Records"} iconName={"needle"} />
      </View>
      <View style={styles.petIcons}>
        <PetInfoButton label={"Pictures"} iconName={"file-image"} />
        <PetInfoButton label={"Notes"} iconName={"book-open"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  petIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
