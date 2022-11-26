import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { APP_COLORS } from "../Helpers/colors";

export default function SnackBarHelper({ text, value, setValue }) {
  const onDismissSnackBar = () => setValue(false);

  return (
    <Snackbar
      style={styles.snackbar}
      theme={{ colors: { surface: APP_COLORS.black, accent: "black" } }}
      duration={5000}
      visible={value}
      onDismiss={onDismissSnackBar}
      action={{
        label: "Dismiss",
        onPress: () => {
          onDismissSnackBar();
        },
      }}
    >
      {text}
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: APP_COLORS.secondary,
    bottom: 24,
  },
});
