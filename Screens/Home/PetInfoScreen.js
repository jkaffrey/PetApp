import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PetInfoButton from "../../Components/Pets/PetInfoButton";

export default function PetInfoScreen({ appUser, route }) {
  const { pet } = route.params;

  let [selectedButton, setSelectedButton] = useState("Information");

  let renderSelectedView = () => {
    if (selectedButton === "Information") {
      return <Text>Information</Text>;
    } else if (selectedButton === "Records") {
      return <Text>Records</Text>;
    } else if (selectedButton === "Pictures") {
      return <Text>Pictures</Text>;
    } else if (selectedButton === "Notes") {
      return <Text>Notes</Text>;
    }
  };

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
          setSelectedButton={setSelectedButton}
        />
        <PetInfoButton
          label={"Records"}
          iconName={"needle"}
          selected={selectedButton}
          setSelectedButton={setSelectedButton}
        />
        <PetInfoButton
          label={"Pictures"}
          iconName={"file-image"}
          selected={selectedButton}
          setSelectedButton={setSelectedButton}
        />
        <PetInfoButton
          label={"Notes"}
          iconName={"book-open"}
          selected={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      </ScrollView>
      {/* Actual Component Content */}
      {renderSelectedView()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  petIcons: {
    paddingLeft: 8,
  },
});
