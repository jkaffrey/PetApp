import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { APP_COLORS } from "../../Helpers/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PetInfoButton({
  label,
  iconName,
  selected,
  setSelectedButton,
}) {
  let isSelected = () => {
    return selected === label;
  };

  return (
    <Pressable
      style={{
        backgroundColor: isSelected()
          ? APP_COLORS.secondary
          : APP_COLORS.primary,
        ...styles.mainContainer,
      }}
      onPress={() => {
        setSelectedButton(label);
      }}
    >
      <View style={styles.innerContainer}>
        <View
          style={{
            backgroundColor: isSelected()
              ? APP_COLORS.black + "70"
              : APP_COLORS.secondary + "40",
            ...styles.icon,
          }}
        >
          <MaterialCommunityIcons
            name={iconName}
            size={36}
            color={isSelected() ? APP_COLORS.offWhite : APP_COLORS.secondary}
          />
        </View>
        <Text
          style={{
            color: isSelected() ? APP_COLORS.offWhite : APP_COLORS.black,
            ...styles.buttonText,
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 16,
    width: 125,
    marginRight: 8,
    marginBottom: 10,
    marginTop: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    height: 130,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
    paddingTop: 4,
    margin: 8,
  },
  icon: {
    padding: 4,
    borderRadius: 8,
  },
});
