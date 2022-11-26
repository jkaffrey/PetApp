import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { APP_COLORS } from "../../Helpers/colors";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SimpleTextInput from "../../Components/SimpleTextInput";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("invalid-email")) {
          Alert.alert("Cannot find account with specified email.");
        } else if (errorMessage.includes("password")) {
          Alert.alert("Password is incorrect");
        } else {
          Alert.alert("Failed to login: \n" + errorMessage);
        }
      });
  };

  const loginDisabled = () => {
    return email !== null && password !== null;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <SimpleTextInput
        placeholder="Email."
        placeholderTextColor={APP_COLORS.grey}
        inputVal={email}
        setInputVal={setEmail}
        clearableInput={false}
      ></SimpleTextInput>

      <SimpleTextInput
        placeholder="Password."
        placeholderTextColor={APP_COLORS.grey}
        passwordInput={true}
        inputVal={password}
        setInputVal={setPassword}
        clearableInput={false}
      ></SimpleTextInput>

      <TouchableOpacity
        style={!loginDisabled() ? styles.loginBtn : styles.loginBtnDisabled}
        onPress={() => {
          login();
        }}
        disabled={loginDisabled()}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("signUp");
        }}
      >
        <Text style={styles.createAccount}>Create an account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("forgotPassword");
        }}
      >
        <Text style={styles.forgot_button}>Forgot Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: APP_COLORS.white,
    borderWidth: 2,
    borderColor: APP_COLORS.grey,
    borderRadius: 10,
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    width: 250,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    padding: 10,
  },

  forgot_button: {
    color: APP_COLORS.black,
    marginTop: 15,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: APP_COLORS.secondary,
  },

  loginBtnDisabled: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: APP_COLORS.grey,
  },

  createAccount: {
    color: APP_COLORS.black,
    marginTop: 15,
  },

  loginText: {
    color: APP_COLORS.white,
  },
});
