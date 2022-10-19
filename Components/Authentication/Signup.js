import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

export default function Login({ appUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState();

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const signIn = () => {
    const strongRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );

    if (!strongRegex.test(email)) {
      showMessage(MESSAGE.username);
      return false;
    } else if (password.length < 8) {
      showMessage(MESSAGE.password);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.TextInput}>
        <TextInput
          style={styles.textEmail}
          placeholder="Email"
          onChangeText={(username) => setEmail(username)}
        />
      </View>

      <View style={styles.iconSection}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          secureTextEntry={hidePassword}
          onChangeText={(password) => setPassword(password)}
        >
          {
            <MaterialCommunityIcons
              style={styles.iconEye}
              onPress={() => setHidePassword(!hidePassword)}
              name={hidePassword ? "eye-outline" : "eye-off-outline"}
            />
          }
        </TextInput>

        <View style={styles.TextInput}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Confirm Password"
            secureTextEntry={hidePassword}
            onChangeText={(password) => setPassword(password)}
          ></TextInput>
        </View>
      </View>
      <Button
        mode="contained"
        style={styles.textSign}
        onPress={() => {}}
        disabled={!email || !password}
      >
        Signup
      </Button>

      <TextInput style={styles.forgotPassword}>Forgot Password?</TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  textEmail: {
    height: 25,
    width: 190,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    marginTop: 40,
  },

  iconEye: {
    textAlign: "right",
  },

  inputPassword: {
    height: 25,
    width: 190,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    marginTop: 10,
  },

  textSign: {
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 2,
    borderWidth: 1,
    padding: 3,
    width: 190,
    textAlign: "center",
    borderRadius: 20,
  },

  forgotPassword: {
    alignSelf: "center",
    marginTop: 12,
  },
});
