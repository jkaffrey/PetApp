import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { APP_COLORS } from "../../Helpers/colors";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import SimpleTextInput from "../../Components/SimpleTextInput";
import SnackBarHelper from "../../Components/SnackBarHelper";

import { validEmail } from "../../Helpers/validation";

export default function ForgotPassword({ selectedTab, setSelectedTab }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailReset, setEmailReset] = useState("");
  const [emailResetFailed, setEmailResetFailed] = useState("");

  const resetPassword = () => {
    Keyboard.dismiss();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailReset(true);
        setEmail("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setEmailResetFailed(true);
      });
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

      <TouchableOpacity
        style={
          !!email && validEmail(email)
            ? styles.loginBtn
            : styles.loginBtnDisabled
        }
        onPress={() => {
          resetPassword();
        }}
        disabled={!!email && validEmail(email)}
      >
        <Text style={styles.loginText}>RESET EMAIL</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.goBack}>Back To Login</Text>
      </TouchableOpacity>

      <SnackBarHelper
        text="Password reset sent, please check your email."
        value={emailReset}
        setValue={setEmailReset}
      ></SnackBarHelper>
      <SnackBarHelper
        text="Failed to send reset email, please try again later."
        value={emailResetFailed}
        setValue={setEmailResetFailed}
      ></SnackBarHelper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -9999,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: APP_COLORS.secondary,
  },

  loginBtnDisabled: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: APP_COLORS.grey,
  },

  loginText: {
    color: APP_COLORS.white,
  },

  goBack: {
    color: APP_COLORS.black,
    marginTop: 16,
  },
});
