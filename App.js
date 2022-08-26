import React from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NativeTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";

import HomeStackScreen from "./ScreenStack/HomeStackScreen";
import { APP_COLORS } from "./Helpers/colors";

const Tab = createBottomTabNavigator();
// https://reactnavigation.org/docs/themes/
const MyTheme = {
  ...NativeTheme,
  colors: {
    ...NativeTheme.colors,
    primary: APP_COLORS.secondary,
    background: APP_COLORS.primary,
    text: APP_COLORS.black,
  },
};

// https://callstack.github.io/react-native-paper/theming.html
const paperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: APP_COLORS.secondary,
    accent: APP_COLORS.red,
    text: APP_COLORS.black,
  },
};

const { width, height } = Dimensions.get("window");

export default function App() {
  const CustomHomeButton = ({ children, onPress }) => {
    return (
      <TouchableOpacity
        style={{
          top: -15,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <View
          style={{
            width: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 70,
            height: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 70,
            left: width / 2 - 35,
            borderRadius: 35,
            borderWidth: 3,
            borderColor: APP_COLORS.primary,
            backgroundColor: APP_COLORS.secondary,
            ...styles.shadow,
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={APP_COLORS.primary}
      />
      <SafeAreaView
        forceInset={{ bottom: "never" }}
        style={styles.mainContainer}
      >
        <PaperProvider theme={paperTheme}>
          <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                tabBarStyle: {
                  elevation: 0,
                  backgroundColor: APP_COLORS.secondary,
                  padding: 0,
                },
              }}
            >
              <Tab.Screen
                name="Home"
                children={() => <HomeStackScreen />}
                options={{
                  headerShown: false,
                  tabBarLabel: "",
                  tabBarLabelStyle: { display: "none" },
                  tabBarIcon: ({ color, size }) => (
                    <View style={{ alignItems: "center" }}>
                      <MaterialCommunityIcons
                        name="dresser"
                        size={36}
                        color={APP_COLORS.primary}
                      />
                    </View>
                  ),
                  tabBarButton: (props) => <CustomHomeButton {...props} />,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
  },

  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.5,
    elevation: 5,
  },
});
