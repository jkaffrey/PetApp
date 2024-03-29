import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { APP_COLORS } from "../Helpers/colors";

export default function NavigationBarHeader({ navigation, navigationTitle }) {
  const route = useRoute();

  const readableHeader = (routeName) => {
    if (routeName === "PetInfo") {
      return (
        (route?.params?.pet?.name ? route.params.pet.name + "'s" : "Pet") +
        " Information"
      );
    } else if (routeName === "PetPictures") {
      return (
        (route?.params?.pet?.name ? route.params.pet.name + "'s" : "Pet") +
        " Pictures"
      );
    }
    return "";
  };

  return (
    <Appbar style={styles.bottomBorder}>
      {navigation.canGoBack ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content
        titleStyle={styles.titleStyle}
        title={readableHeader(route.name)}
      />
    </Appbar>
  );
}

const styles = StyleSheet.create({
  bottomBorder: {
    backgroundColor: APP_COLORS.primary,
  },
  titleStyle: {
    fontWeight: "bold",
  },
});
