import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../Screens/HomeScreen";
import NavigationBarHeader from "../Components/NavigationBarHeader";

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ appUser }) {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        header: (props) => <NavigationBarHeader {...props} />,
      }}
    >
      <HomeStack.Screen name="HomeScreen" options={{ headerShown: false }}>
        {(props) => <HomeScreen {...props} appUser={appUser} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}
