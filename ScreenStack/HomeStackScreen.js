import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../Screens/HomeScreen";
import NavigationBarHeader from "../Components/NavigationBarHeader";

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        header: (props) => (
          <NavigationBarHeader {...props} selectedUser={selectedUser} />
        ),
      }}
    >
      <HomeStack.Screen name="HomeScreen" options={{ headerShown: false }}>
        {(props) => <HomeScreen {...props} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}
