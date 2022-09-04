import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PetInfoButton from "../../Components/Pets/PetInfoButton";

export default function PetInfoScreen({ appUser, route }) {
  const { pet } = route.params;

  let [selectedButton, setSelectedButton] = useState("Information");

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.petIcons}
        showsHorizontalScrollIndicator={false}
      >
        <PetInfoButton
          label={"Information"}
          iconName={"information"}
          selected={selectedButton}
        />
        <PetInfoButton
          label={"Records"}
          iconName={"needle"}
          selected={selectedButton}
        />
        <PetInfoButton
          label={"Pictures"}
          iconName={"file-image"}
          selected={selectedButton}
        />
        <PetInfoButton
          label={"Notes"}
          iconName={"book-open"}
          selected={selectedButton}
        />
      </ScrollView>
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
  petIcons: {},
});
