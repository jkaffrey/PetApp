import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { APP_COLORS } from "../Helpers/colors";

const { width, height } = Dimensions.get("window");

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageSmaller}
        source={require("../assets/waiting.gif")}
      />
      <Text style={styles.text}>
        The app is loading, please give us a few minutes while we get our ducks
        in a row...
      </Text>
      <Image style={styles.image} source={require("../assets/ducks.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: APP_COLORS.primary,
  },

  image: {
    width: width * 0.85,
    height: 200,
    marginTop: 24,
    marginBottom: 24,
    resizeMode: "contain",
  },

  imageSmaller: {
    width: width * 0.35,
    height: 200,
    resizeMode: "contain",
  },

  text: {
    color: APP_COLORS.black,
    fontSize: 16,
    textAlign: "center",
  },
});
