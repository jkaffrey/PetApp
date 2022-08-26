import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

export default function NavigationBarHeader({ navigation, navigationTitle }) {
  const route = useRoute();

  const readableHeader = (routeName) => {
    return "";
  };

  return (
    <Appbar style={styles.bottomBorder}>
      {navigation.canGoBack ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content title={readableHeader(route.name)} />
    </Appbar>
  );
}

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});
