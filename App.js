import "./firebase";

import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  LogBox,
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NativeTheme,
} from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";

import HomeStackScreen from "./ScreenStack/HomeStackScreen";
import AuthStackScreen from "./ScreenStack/AuthStackScreen";
import { APP_COLORS } from "./Helpers/colors";

/** Firebase Imports */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoadingScreen from "./Components/LoadingScreen";

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
  LogBox.ignoreLogs([""]);

  /** Userbased firebase login authentication */
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        forceInset={{ bottom: "never" }}
        style={styles.mainContainer}
      >
        <PaperProvider theme={paperTheme}>
          <NavigationContainer theme={MyTheme}>
            {loading ? (
              <LoadingScreen />
            ) : !user ? (
              <AuthStackScreen loading={loading} setLoading={setLoading} />
            ) : (
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                  tabBarStyle: {
                    elevation: 0,
                    padding: 0,
                    backgroundColor: APP_COLORS.secondary,
                    borderTopWidth: 0,
                  },
                }}
              >
                <Tab.Screen
                  name="Home"
                  children={() => (
                    <HomeStackScreen
                      appUser={user}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  )}
                  options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarLabelStyle: { display: "none" },
                    tabBarIcon: ({ color, size }) => (
                      <View style={{ alignItems: "center" }}>
                        <MaterialCommunityIcons
                          name="dog"
                          size={36}
                          color={APP_COLORS.primary}
                        />
                      </View>
                    ),
                    tabBarButton: (props) => <CustomHomeButton {...props} />,
                  }}
                />
              </Tab.Navigator>
            )}
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
