import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PetInfoButton from "../../Components/Pets/PetInfoButton";
import { APP_COLORS } from "../../Helpers/colors";

let ScreenHeight = Dimensions.get("window").height;

export default function PetInfoScreen({ appUser, route }) {
  const { pet } = route.params;
  const navigation = useNavigation();

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
          onClick={() => {
            navigation.navigate("PetPictures", {
              pet,
            });
          }}
        />
        <PetInfoButton
          label={"Notes"}
          iconName={"book-open"}
          selected={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      </ScrollView>
      {/* Actual Component Content */}
      <ScrollView style={styles.petView}>{renderSelectedView()}</ScrollView>
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
  petView: {
    flex: 1,
    backgroundColor: APP_COLORS.secondary + "15",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 6,
    height: ScreenHeight * 0.53,
  },
});
