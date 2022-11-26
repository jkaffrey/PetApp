import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NavigationBarHeader from "../Components/NavigationBarHeader";
import Login from "../Screens/Authentication/LoginScreen";
import Signup from "../Screens/Authentication/SignupScreen";
import ForgotPassword from "../Screens/Authentication/ForgotPasswordScreen";

const AuthStack = createStackNavigator();

export default function AuthStackScreen({ loading, setLoading }) {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: (props) => <NavigationBarHeader {...props} />,
      }}
    >
      <AuthStack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <Login {...props} />}
      </AuthStack.Screen>

      <AuthStack.Screen name="signUp" options={{ headerShown: false }}>
        {(props) => (
          <Signup {...props} loading={loading} setLoading={setLoading} />
        )}
      </AuthStack.Screen>

      <AuthStack.Screen name="forgotPassword" options={{ headerShown: false }}>
        {(props) => <ForgotPassword {...props} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
}
