import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function PetImage({ image }) {
  return (
    <TouchableOpacity
      activeOpacity={0.25}
      onPress={() => {
        Alert.alert("Short press, show pet image in full screen");
      }}
      onLongPress={() => {
        Alert.alert("Long pressed, show modal for delete / favorite");
      }}
    >
      <Image style={styles.image} source={{ uri: image }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    height: SCREEN_WIDTH / 4,
    width: SCREEN_WIDTH / 4,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
});
